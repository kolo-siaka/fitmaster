// Décrit les informations d'un membre (client de la salle)
export interface Membre {
  id: number;
  numero: string; // numéro de membre, ex. FM-000123
  nom: string;
  prenoms: string;
  telephone: string; // format international sans « + », ex. 2250707070707
  photoUrl?: string; // le « ? » veut dire facultatif : sans photo, on affiche les initiales
  salle: string;
}