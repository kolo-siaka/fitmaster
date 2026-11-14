// Décrit les informations d'un membre (client de la salle)
export interface Membre {
  id: number;
  numero: string; // numéro de membre, ex. FM-000123
  nom: string;
  prenoms: string;
  sexe: 'F' | 'M';
  dateNaissance?: string; // format AAAA-MM-JJ
  telephone: string; // format international sans « + », ex. 2250707070707
  email?: string;
  commune?: string;
  photoUrl?: string; // sans photo, on affiche les initiales
  salle: string;
  dateInscription: string; // format AAAA-MM-JJ
  objectif?: string;
  contactUrgence?: { nom: string; telephone: string };
  sante?: string; // problèmes de santé, contre-indications
}