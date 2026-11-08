import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AbonnementARelancer } from '../../../core/models/abonnement.model';
import { Avatar } from '../../../shared/components/avatar/avatar';

// La carte d'UN membre à relancer
@Component({
  selector: 'app-relance-card',
  imports: [DatePipe, DecimalPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, Avatar],
  templateUrl: './relance-card.html',
  styleUrl: './relance-card.scss',
})
export class RelanceCard {
  // L'abonnement à afficher, donné par le composant parent
  readonly abonnement = input.required<AbonnementARelancer>();

  // Texte du badge d'échéance : « Aujourd'hui », « J-2 » ou « Expiré +6 j »
  protected readonly libelleEcheance = computed(() => {
    const j = this.abonnement().joursRestants;
    if (j === 0) return "Expire aujourd'hui";
    if (j > 0) return `J-${j}`;
    return `Expiré +${-j} j`;
  });

  // Lien WhatsApp avec un message adapté à la situation du membre
  protected readonly lienWhatsApp = computed(() => {
    const a = this.abonnement();
    const reste = a.resteAPayer.toLocaleString('fr-FR');
    const dateLimite = new Date(a.dateLimiteSolde + 'T00:00:00').toLocaleDateString('fr-FR');
    const lignes = [`Bonjour ${a.membre.prenoms},`];

    if (a.echeance === 'expire') {
      lignes.push(`votre abonnement ${a.formule} est arrivé à échéance. Nous serions ravis de vous revoir !`);
    } else if (a.echeance === 'bientot') {
      lignes.push(`votre abonnement ${a.formule} arrive bientôt à échéance. Pensez à le renouveler.`);
    }
    if (a.resteAPayer > 0) {
      lignes.push(
        a.soldeEnRetard
          ? `Il vous reste ${reste} FCFA à régler (date limite dépassée : ${dateLimite}).`
          : `Il vous reste ${reste} FCFA à régler avant le ${dateLimite}.`,
      );
    }
    lignes.push('À très vite à la salle !');

    return `https://wa.me/${a.membre.telephone}?text=${encodeURIComponent(lignes.join('\n'))}`;
  });
}