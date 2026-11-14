import { Component, computed, input, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

// Barre de pagination réutilisable, à placer sous n'importe quel tableau
@Component({
  selector: 'app-pagination',
  imports: [MatIconModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  // Nombre total de lignes (après recherche et filtres)
  readonly total = input.required<number>();
  // Page affichée et nombre de lignes par page : « model » = valeur partagée avec le parent
  readonly page = model.required<number>();
  readonly taillePage = model(10);
  readonly taillesPossibles = input([10, 25, 50]);

  protected readonly nombrePages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.taillePage())),
  );

  // Numéros de la première et de la dernière ligne affichées : « 11–20 sur 47 »
  protected readonly debut = computed(() =>
    this.total() === 0 ? 0 : (this.page() - 1) * this.taillePage() + 1,
  );
  protected readonly fin = computed(() => Math.min(this.page() * this.taillePage(), this.total()));

  // Les boutons de pages à afficher, avec « … » quand il y en a beaucoup : 1 … 4 5 6 … 12
  protected readonly boutons = computed<(number | '…')[]>(() => {
    const n = this.nombrePages();
    const p = this.page();
    if (n <= 7) {
      return Array.from({ length: n }, (_, i) => i + 1);
    }
    const liste: (number | '…')[] = [1];
    if (p > 3) liste.push('…');
    for (let i = Math.max(2, p - 1); i <= Math.min(n - 1, p + 1); i++) liste.push(i);
    if (p < n - 2) liste.push('…');
    liste.push(n);
    return liste;
  });

  protected allerA(page: number): void {
    this.page.set(Math.min(Math.max(page, 1), this.nombrePages()));
  }

  protected changerTaille(evenement: Event): void {
    this.taillePage.set(Number((evenement.target as HTMLSelectElement).value));
    this.page.set(1); // on revient à la première page
  }
}