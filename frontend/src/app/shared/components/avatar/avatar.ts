import { Component, computed, input } from '@angular/core';

// Affiche la photo d'une personne, ou ses initiales si elle n'a pas de photo
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  host: {
    '[style.width.px]': 'taille()',
    '[style.height.px]': 'taille()',
    '[style.font-size.px]': 'taille() * 0.4',
  },
})
export class Avatar {
  // Les « input » sont les informations qu'on donne au composant de l'extérieur
  readonly nom = input.required<string>();
  readonly photoUrl = input<string | undefined>();
  readonly taille = input(40);

  // « Koné Awa » → « KA »
  protected readonly initiales = computed(() =>
    this.nom()
      .split(' ')
      .filter((mot) => mot.length > 0)
      .slice(0, 2)
      .map((mot) => mot[0].toUpperCase())
      .join(''),
  );
}