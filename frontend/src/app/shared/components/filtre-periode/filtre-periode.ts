import { Component, input, model, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

// Une période : date de début et date de fin (format AAAA-MM-JJ), ou null = pas de limite
export interface Periode {
  du: string | null;
  au: string | null;
}

type Raccourci = 'toutes' | 'aujourdhui' | '7j' | '30j' | 'mois' | 'perso';

// Filtre par période réutilisable : raccourcis (aujourd'hui, 7 jours…) ou dates au choix
@Component({
  selector: 'app-filtre-periode',
  imports: [MatIconModule],
  templateUrl: './filtre-periode.html',
  styleUrl: './filtre-periode.scss',
})
export class FiltrePeriode {
  // La période choisie, partagée avec le parent
  readonly periode = model<Periode>({ du: null, au: null });
  // Ce que la date représente (« Inscrits », « Payés »…), affiché devant le menu
  readonly libelle = input('Période');

  protected readonly raccourci = signal<Raccourci>('toutes');

  protected readonly raccourcis: { valeur: Raccourci; texte: string }[] = [
    { valeur: 'toutes', texte: 'Toutes les dates' },
    { valeur: 'aujourdhui', texte: "Aujourd'hui" },
    { valeur: '7j', texte: '7 derniers jours' },
    { valeur: '30j', texte: '30 derniers jours' },
    { valeur: 'mois', texte: 'Ce mois-ci' },
    { valeur: 'perso', texte: 'Dates au choix…' },
  ];

  protected choisirRaccourci(evenement: Event): void {
    const valeur = (evenement.target as HTMLSelectElement).value as Raccourci;
    this.raccourci.set(valeur);
    const aujourdhui = new Date();

    switch (valeur) {
      case 'toutes':
        this.periode.set({ du: null, au: null });
        break;
      case 'aujourdhui':
        this.periode.set({ du: enTexte(aujourdhui), au: enTexte(aujourdhui) });
        break;
      case '7j':
        this.periode.set({ du: enTexte(ilYa(6)), au: enTexte(aujourdhui) });
        break;
      case '30j':
        this.periode.set({ du: enTexte(ilYa(29)), au: enTexte(aujourdhui) });
        break;
      case 'mois':
        this.periode.set({
          du: enTexte(new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), 1)),
          au: enTexte(aujourdhui),
        });
        break;
      // 'perso' : on garde les dates actuelles, l'utilisateur les change lui-même
    }
  }

  protected changerDu(evenement: Event): void {
    const du = (evenement.target as HTMLInputElement).value || null;
    this.periode.update((p) => ({ ...p, du }));
  }

  protected changerAu(evenement: Event): void {
    const au = (evenement.target as HTMLInputElement).value || null;
    this.periode.update((p) => ({ ...p, au }));
  }
}

// Une date → « AAAA-MM-JJ »
function enTexte(d: Date): string {
  const mois = String(d.getMonth() + 1).padStart(2, '0');
  const jour = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mois}-${jour}`;
}

// La date d'il y a n jours
function ilYa(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// Vrai si la date (AAAA-MM-JJ) est dans la période. Utilisable par toutes les pages.
export function estDansPeriode(date: string, periode: Periode): boolean {
  return (!periode.du || date >= periode.du) && (!periode.au || date <= periode.au);
}