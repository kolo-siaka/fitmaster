import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell, // le shell entoure toutes ces pages
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tableau-de-bord' },
      {
        path: 'tableau-de-bord',
        title: 'Tableau de bord · FitMaster',
        loadComponent: () =>
          import('./features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
      },
      {
        path: 'membres',
        title: 'Membres · FitMaster',
        loadComponent: () =>
          import('./features/membres/membres-page/membres-page').then((m) => m.MembresPage),
      },
      {
        path: 'abonnements',
        title: 'Abonnements · FitMaster',
        loadComponent: () =>
          import('./features/abonnements/abonnements-page/abonnements-page').then((m) => m.AbonnementsPage),
      },
      {
        path: 'entrees',
        title: 'Entrées · FitMaster',
        loadComponent: () =>
          import('./features/entrees/entrees-page/entrees-page').then((m) => m.EntreesPage),
      },
      {
        path: 'caisse',
        title: 'Caisse · FitMaster',
        loadComponent: () =>
          import('./features/caisse/caisse-page/caisse-page').then((m) => m.CaissePage),
      },
      {
        path: 'produits',
        title: 'Produits & stock · FitMaster',
        loadComponent: () =>
          import('./features/produits/produits-page/produits-page').then((m) => m.ProduitsPage),
      },
      {
        path: 'employes',
        title: 'Employés · FitMaster',
        loadComponent: () =>
          import('./features/employes/employes-page/employes-page').then((m) => m.EmployesPage),
      },
    ],
  },
  { path: '**', redirectTo: '' }, // adresse inconnue → retour à l'accueil
];