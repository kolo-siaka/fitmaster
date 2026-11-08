import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Décrit à quoi ressemble un lien du menu
interface NavItem {
  label: string; // le texte affiché
  icon: string;  // le nom de l'icône Material
  path: string;  // l'adresse de la page
}

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', path: '/tableau-de-bord' },
    { label: 'Membres', icon: 'groups', path: '/membres' },
    { label: 'Abonnements', icon: 'card_membership', path: '/abonnements' },
    { label: 'Entrées', icon: 'qr_code_scanner', path: '/entrees' },
    { label: 'Caisse', icon: 'point_of_sale', path: '/caisse' },
    { label: 'Produits & stock', icon: 'inventory_2', path: '/produits' },
    { label: 'Employés', icon: 'badge', path: '/employes' },
  ];
}