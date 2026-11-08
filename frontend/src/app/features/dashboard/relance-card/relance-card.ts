import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AbonnementARelancer } from '../../../core/models/abonnement.model';
import { Avatar } from '../../../shared/components/avatar/avatar';

// La carte d'UN membre dont l'abonnement arrive à échéance
@Component({
  selector: 'app-relance-card',
  imports: [DatePipe, DecimalPipe, MatButtonModule, MatIconModule, MatTooltipModule, Avatar],
  templateUrl: './relance-card.html',
  styleUrl: './relance-card.scss',
})
export class RelanceCard {
  // L'abonnement à afficher, donné par le composant parent
  readonly abonnement = input.required<AbonnementARelancer>();

  // « Expire aujourd'hui », « Expire demain », « Expire dans 3 jours »
  protected readonly etat = computed(() => {
    const j = this.abonnement().joursRestants;
    if (j === 0) return "Expire aujourd'hui";
    if (j === 1) return 'Expire demain';
    return `Expire dans ${j} jours`;
  });

  // Lien WhatsApp avec un message de rappel déjà écrit
  protected readonly lienWhatsApp = computed(() => {
    const a = this.abonnement();
    const lignes = [
      `Bonjour ${a.membre.prenoms},`,
      `votre abonnement ${a.formule} arrive à échéance le ${new Date(a.dateFin + 'T00:00:00').toLocaleDateString('fr-FR')}.`,
    ];
    if (a.resteAPayer > 0) {
      lignes.push(`Il vous reste également ${a.resteAPayer.toLocaleString('fr-FR')} FCFA à régler.`);
    }
    lignes.push('Passez à l’accueil pour le renouveler. À très vite !');

    return `https://wa.me/${a.membre.telephone}?text=${encodeURIComponent(lignes.join('\n'))}`;
  });
}