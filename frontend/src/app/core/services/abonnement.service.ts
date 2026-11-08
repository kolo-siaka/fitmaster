import { computed, Service, signal } from '@angular/core';
import { Abonnement, AbonnementARelancer } from '../models/abonnement.model';
import { ParametresEntreprise } from '../models/parametres-entreprise.model';

@Service()
export class AbonnementService {
  // Règles de l'entreprise (fictives ; plus tard elles viendront du backend)
  readonly parametres = signal<ParametresEntreprise>({
    acompteMinPourcent: 50,
    delaiSoldeJours: 14,
    seuilEcheanceJours: 7,
    periodeExpiresJours: 30,
  });

  // Abonnements fictifs en attendant le backend
  private readonly abonnements = signal<Abonnement[]>(creerAbonnementsFictifs());

  // Membres à relancer : échéance proche, expiré récemment, ou reste à payer
  readonly aRelancer = computed<AbonnementARelancer[]>(() => {
    const p = this.parametres();

    return this.abonnements()
      .map((a) => this.enrichir(a, p))
      .filter(
        (a) =>
          a.echeance === 'bientot' ||
          (a.echeance === 'expire' && a.joursRestants >= -p.periodeExpiresJours) ||
          a.resteAPayer > 0,
      )
      .sort((a, b) => a.joursRestants - b.joursRestants);
  });

  // Ajoute à un abonnement toutes les informations calculées
  private enrichir(a: Abonnement, p: ParametresEntreprise): AbonnementARelancer {
    const joursRestants = joursAvant(a.dateFin);
    const echeance =
      joursRestants < 0 ? 'expire' : joursRestants <= p.seuilEcheanceJours ? 'bientot' : 'active';
    const resteAPayer = Math.max(a.montantTotal - a.montantPaye, 0);
    const dateLimiteSolde = ajouterJours(a.dateDebut, p.delaiSoldeJours);

    return {
      ...a,
      joursRestants,
      echeance,
      resteAPayer,
      pourcentagePaye: Math.round((a.montantPaye / a.montantTotal) * 100),
      dateLimiteSolde,
      soldeEnRetard: resteAPayer > 0 && joursAvant(dateLimiteSolde) < 0,
    };
  }
}

// ---------- Fonctions utilitaires sur les dates ----------

// Nombre de jours entre aujourd'hui et une date (négatif si la date est passée)
function joursAvant(date: string): number {
  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);
  const cible = new Date(date + 'T00:00:00');
  return Math.round((cible.getTime() - aujourdhui.getTime()) / 86_400_000);
}

// Une date + n jours, au format AAAA-MM-JJ
function ajouterJours(date: string, n: number): string {
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + n);
  const mois = String(d.getMonth() + 1).padStart(2, '0');
  const jour = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mois}-${jour}`;
}

// Aujourd'hui + n jours
function dansNJours(n: number): string {
  const d = new Date();
  const aujourdhui = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return ajouterJours(aujourdhui, n);
}

// ---------- Données fictives ----------

function creerAbonnementsFictifs(): Abonnement[] {
  // [nom, prénoms, formule, jours avant l'échéance, durée en jours, prix, déjà payé]
  const fictifs: [string, string, string, number, number, number, number][] = [
    ['Koné', 'Awa', 'Mensuel', 2, 30, 15000, 7500], // bientôt + solde en retard
    ['Traoré', 'Ibrahim', 'Trimestriel', 5, 90, 40000, 40000], // bientôt, tout payé
    ['Kouassi', 'Ange', 'Mensuel', 0, 30, 15000, 15000], // expire aujourd'hui
    ['Ouattara', 'Karim', 'Mensuel', 25, 30, 15000, 7500], // vient de s'inscrire, solde à payer
    ['Bamba', 'Fatou', 'Annuel', 200, 365, 150000, 150000], // rien à signaler
    ['Yao', 'Marc', 'Mensuel', -6, 30, 15000, 15000], // expiré
    ['Diallo', 'Mariam', 'Trimestriel', -2, 90, 40000, 30000], // expiré + reste à payer
    ['Coulibaly', 'Seydou', 'Mensuel', -45, 30, 15000, 15000], // expiré depuis trop longtemps
  ];

  return fictifs.map(([nom, prenoms, formule, jours, duree, prix, paye], i) => ({
    id: i + 1,
    membre: {
      id: i + 1,
      numero: `FM-${String(i + 1).padStart(6, '0')}`,
      nom,
      prenoms,
      telephone: `22507000000${i}`,
      salle: i % 2 === 0 ? 'Cocody' : 'Plateau',
    },
    formule,
    dateDebut: dansNJours(jours - duree),
    dateFin: dansNJours(jours),
    montantTotal: prix,
    montantPaye: paye,
  }));
}