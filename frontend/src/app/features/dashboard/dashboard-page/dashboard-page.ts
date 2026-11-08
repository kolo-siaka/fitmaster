import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RenouvellementsCard } from '../renouvellements-card/renouvellements-card';

interface Indicateur {
  libelle: string;
  valeur: string;
  detail: string;
  icone: string;
}

@Component({
  selector: 'app-dashboard-page',
  imports: [DatePipe, MatIconModule, RenouvellementsCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly aujourdhui = new Date();

  // Chiffres fictifs en attendant le backend
  protected readonly indicateurs: Indicateur[] = [
    { libelle: 'Membres actifs', valeur: '128', detail: '+9 ce mois-ci', icone: 'groups' },
    { libelle: "Entrées aujourd'hui", valeur: '46', detail: 'Pic entre 18 h et 20 h', icone: 'login' },
    { libelle: 'Recette du jour', valeur: '185 000 FCFA', detail: 'Caisse ouverte à 7 h 02', icone: 'payments' },
    { libelle: 'Produits vendus', valeur: '23', detail: 'Surtout eau et créatine', icone: 'shopping_bag' },
  ];
}