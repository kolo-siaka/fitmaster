import { Membre } from './membre.model';

// Un abonnement souscrit par un membre
export interface Abonnement {
  id: number;
  membre: Membre;
  formule: string; // ex. « Mensuel », « Trimestriel »
  dateDebut: string; // date de souscription, format AAAA-MM-JJ
  dateFin: string; // date d'échéance, format AAAA-MM-JJ
  montantTotal: number; // prix de la formule, en FCFA
  montantPaye: number; // total déjà versé, en FCFA
}

// Un abonnement à relancer, avec toutes les informations calculées
export interface AbonnementARelancer extends Abonnement {
  joursRestants: number; // avant l'échéance (négatif = jours de retard)
  echeance: 'active' | 'bientot' | 'expire';
  resteAPayer: number; // en FCFA
  pourcentagePaye: number; // de 0 à 100
  dateLimiteSolde: string; // date avant laquelle le reste doit être payé
  soldeEnRetard: boolean; // date limite dépassée et reste > 0
}