import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AbonnementService } from '../../../core/services/abonnement.service';
import { RelanceCard } from '../relance-card/relance-card';

type Filtre = 'tous' | 'bientot' | 'expire' | 'reste';

// La section « Abonnements à relancer » : les filtres + la grille de cartes
@Component({
  selector: 'app-renouvellements-card',
  imports: [DecimalPipe, MatButtonToggleModule, RelanceCard],
  templateUrl: './renouvellements-card.html',
  styleUrl: './renouvellements-card.scss',
})
export class RenouvellementsCard {
  private readonly abonnementService = inject(AbonnementService);
  private readonly tous = this.abonnementService.aRelancer;

  // Le filtre choisi (au départ : « tous »)
  protected readonly filtre = signal<Filtre>('tous');

  // Combien de membres dans chaque filtre
  protected readonly compteurs = computed(() => ({
    tous: this.tous().length,
    bientot: this.tous().filter((a) => a.echeance === 'bientot').length,
    expire: this.tous().filter((a) => a.echeance === 'expire').length,
    reste: this.tous().filter((a) => a.resteAPayer > 0).length,
  }));

  // Les cartes à afficher selon le filtre choisi
  protected readonly liste = computed(() => {
    switch (this.filtre()) {
      case 'bientot':
        return this.tous().filter((a) => a.echeance === 'bientot');
      case 'expire':
        return this.tous().filter((a) => a.echeance === 'expire');
      case 'reste':
        return this.tous().filter((a) => a.resteAPayer > 0);
      default:
        return this.tous();
    }
  });

  // Somme de tous les restes à payer
  protected readonly totalReste = computed(() =>
    this.tous().reduce((somme, a) => somme + a.resteAPayer, 0),
  );
}