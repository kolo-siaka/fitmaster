import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RenouvellementsCard } from '../renouvellements-card/renouvellements-card';

interface Indicateur {
  libelle: string;
  valeur: number;
  icone: string;
  unite?: string;
}

@Component({
  selector: 'app-dashboard-page',
  imports: [DecimalPipe, MatCardModule, MatIconModule, RenouvellementsCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  // Chiffres fictifs en attendant le backend
  protected readonly indicateurs: Indicateur[] = [
    { libelle: 'Membres actifs', valeur: 128, icone: 'groups' },
    { libelle: "Entrées aujourd'hui", valeur: 46, icone: 'login' },
    { libelle: 'Recette du jour', valeur: 185000, icone: 'payments', unite: 'FCFA' },
    { libelle: 'Ventes de produits', valeur: 23, icone: 'shopping_bag' },
  ];
}