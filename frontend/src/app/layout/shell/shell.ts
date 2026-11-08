import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Avatar } from '../../shared/components/avatar/avatar';

// Un lien du menu
interface NavItem {
  label: string;
  icon: string;
  path: string;
}

// Un groupe de liens, avec son titre
interface NavGroupe {
  titre: string;
  liens: NavItem[];
}

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, Avatar],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  // Le menu est rangé en deux groupes : le travail de tous les jours, puis la gestion
  protected readonly groupes: NavGroupe[] = [
    {
      titre: 'Au quotidien',
      liens: [
        { label: 'Tableau de bord', icon: 'space_dashboard', path: '/tableau-de-bord' },
        { label: 'Entrées', icon: 'qr_code_scanner', path: '/entrees' },
        { label: 'Caisse', icon: 'point_of_sale', path: '/caisse' },
      ],
    },
    {
      titre: 'Gestion',
      liens: [
        { label: 'Membres', icon: 'groups', path: '/membres' },
        { label: 'Abonnements', icon: 'card_membership', path: '/abonnements' },
        { label: 'Produits et stock', icon: 'inventory_2', path: '/produits' },
        { label: 'Employés', icon: 'badge', path: '/employes' },
      ],
    },
  ];

  // Sur petit écran, le menu est caché : ce signal dit s'il est ouvert ou fermé
  protected readonly menuOuvert = signal(false);
}