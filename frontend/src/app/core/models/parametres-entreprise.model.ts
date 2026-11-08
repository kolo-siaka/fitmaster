// Les règles que chaque entreprise choisit dans ses paramètres
export interface ParametresEntreprise {
  acompteMinPourcent: number; // ex. 50 → on paie au moins la moitié à la souscription
  delaiSoldeJours: number; // ex. 14 → deux semaines pour payer le reste
  seuilEcheanceJours: number; // ex. 7 → « bientôt à échéance » à 7 jours ou moins
  periodeExpiresJours: number; // ex. 30 → on relance les expirés des 30 derniers jours
}