import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AbonnementService } from '../../../core/services/abonnement.service';
import { RelanceCard } from '../relance-card/relance-card';

// La section « Arrivent à échéance » du tableau de bord
@Component({
  selector: 'app-renouvellements-card',
  imports: [RouterLink, MatButtonModule, MatIconModule, RelanceCard],
  templateUrl: './renouvellements-card.html',
  styleUrl: './renouvellements-card.scss',
})
export class RenouvellementsCard {
  private readonly abonnementService = inject(AbonnementService);

  protected readonly echeances = this.abonnementService.echeancesProches;
  protected readonly seuil = this.abonnementService.parametres().seuilEcheanceJours;
}