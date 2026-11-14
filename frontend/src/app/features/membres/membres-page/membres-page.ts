import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AbonnementARelancer } from '../../../core/models/abonnement.model';
import { Membre } from '../../../core/models/membre.model';
import { AbonnementService } from '../../../core/services/abonnement.service';
import { MembreService } from '../../../core/services/membre.service';
import { Avatar } from '../../../shared/components/avatar/avatar';
import { TelephonePipe } from '../../../shared/pipes/telephone-pipe';

type Statut = 'actif' | 'bientot' | 'expire' | 'sans';
type Filtre = 'tous' | Statut;

// Une ligne du tableau : un membre + son abonnement le plus récent (s'il en a un)
interface LigneMembre {
  membre: Membre;
  abonnement?: AbonnementARelancer;
  statut: Statut;
}

@Component({
  selector: 'app-membres-page',
  imports: [DatePipe, MatIconModule, Avatar, TelephonePipe],
  templateUrl: './membres-page.html',
  styleUrl: './membres-page.scss',
})
export class MembresPage {
  private readonly membreService = inject(MembreService);
  private readonly abonnementService = inject(AbonnementService);

  // Ce que l'utilisateur tape dans la recherche, et le filtre choisi
  protected readonly recherche = signal('');
  protected readonly filtre = signal<Filtre>('tous');

  // Toutes les lignes, triées par nom
  private readonly lignes = computed<LigneMembre[]>(() => {
    const abonnements = this.abonnementService.tous();

    return this.membreService
      .membres()
      .map((membre) => {
        // L'abonnement le plus récent du membre (celui qui finit le plus tard)
        const abonnement = abonnements
          .filter((a) => a.membre.id === membre.id)
          .sort((a, b) => b.dateFin.localeCompare(a.dateFin))[0];

        const statut: Statut = !abonnement
          ? 'sans'
          : abonnement.echeance === 'active'
            ? 'actif'
            : abonnement.echeance;

        return { membre, abonnement, statut };
      })
      .sort((a, b) => a.membre.nom.localeCompare(b.membre.nom, 'fr'));
  });

  // Les lignes qui correspondent à la recherche ET au filtre
  protected readonly lignesAffichees = computed(() => {
    const texte = normaliser(this.recherche());
    const filtre = this.filtre();

    return this.lignes().filter((l) => {
      const m = l.membre;
      const correspondRecherche =
        texte === '' ||
        normaliser(`${m.nom} ${m.prenoms} ${m.prenoms} ${m.nom} ${m.numero} ${m.telephone}`).includes(
          texte,
        );
      const correspondFiltre = filtre === 'tous' || l.statut === filtre;
      return correspondRecherche && correspondFiltre;
    });
  });

  // Les filtres proposés, avec le nombre de membres dans chacun
  protected readonly filtres = computed(() => {
    const compter = (s: Statut) => this.lignes().filter((l) => l.statut === s).length;
    return [
      { valeur: 'tous' as Filtre, libelle: 'Tous', nombre: this.lignes().length },
      { valeur: 'actif' as Filtre, libelle: 'Actifs', nombre: compter('actif') },
      { valeur: 'bientot' as Filtre, libelle: 'Échéance proche', nombre: compter('bientot') },
      { valeur: 'expire' as Filtre, libelle: 'Expirés', nombre: compter('expire') },
      { valeur: 'sans' as Filtre, libelle: 'Sans abonnement', nombre: compter('sans') },
    ];
  });

  // Appelé à chaque lettre tapée dans la recherche
  protected surRecherche(evenement: Event): void {
    this.recherche.set((evenement.target as HTMLInputElement).value);
  }
}

// « Koné » → « kone » : minuscules et sans accents, pour que la recherche trouve
// « Kone », « KONÉ » ou « koné » de la même façon
function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}