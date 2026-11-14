import { Service, signal } from '@angular/core';
import { MEMBRES_FICTIFS } from '../data/membres-fictifs';
import { Membre } from '../models/membre.model';

@Service()
export class MembreService {
  // La liste des membres (fictive ; plus tard elle viendra du backend)
  readonly membres = signal<Membre[]>(MEMBRES_FICTIFS);

  // Retrouver un membre grâce à son id
  parId(id: number): Membre | undefined {
    return this.membres().find((m) => m.id === id);
  }
}