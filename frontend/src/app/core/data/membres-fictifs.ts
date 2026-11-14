import { Membre } from '../models/membre.model';

// Membres fictifs, en attendant le backend
export const MEMBRES_FICTIFS: Membre[] = [
  {
    id: 1, numero: 'FM-000001', nom: 'Koné', prenoms: 'Awa', sexe: 'F', dateNaissance: '1996-04-12',
    telephone: '2250701112233', email: 'awa.kone@exemple.ci', commune: 'Cocody Angré', salle: 'Cocody',
    dateInscription: '2025-09-02', objectif: 'Perte de poids',
    contactUrgence: { nom: 'Koné Bakary', telephone: '2250504445566' },
  },
  {
    id: 2, numero: 'FM-000002', nom: 'Traoré', prenoms: 'Ibrahim', sexe: 'M', dateNaissance: '1990-11-03',
    telephone: '2250702223344', commune: 'Plateau', salle: 'Plateau', dateInscription: '2025-03-15',
    objectif: 'Prise de masse',
  },
  {
    id: 3, numero: 'FM-000003', nom: 'Kouassi', prenoms: 'Ange', sexe: 'M', dateNaissance: '1999-07-21',
    telephone: '2250703334455', commune: 'Cocody Riviera', salle: 'Cocody', dateInscription: '2026-01-10',
    objectif: 'Remise en forme',
  },
  {
    id: 4, numero: 'FM-000004', nom: 'Sanogo', prenoms: 'Aïcha', sexe: 'F', dateNaissance: '1994-02-08',
    telephone: '2250704445566', email: 'aicha.sanogo@exemple.ci', commune: 'Marcory', salle: 'Plateau',
    dateInscription: '2025-11-20', objectif: 'Remise en forme', sante: 'Asthme léger',
  },
  {
    id: 5, numero: 'FM-000005', nom: 'Ouattara', prenoms: 'Karim', sexe: 'M', dateNaissance: '2001-09-30',
    telephone: '2250705556677', commune: 'Cocody', salle: 'Cocody', dateInscription: '2026-11-09',
    objectif: 'Prise de masse',
  },
  {
    id: 6, numero: 'FM-000006', nom: 'Bamba', prenoms: 'Fatou', sexe: 'F', dateNaissance: '1988-05-17',
    telephone: '2250706667788', commune: 'Deux-Plateaux', salle: 'Plateau', dateInscription: '2024-06-01',
    objectif: 'Remise en forme',
  },
  {
    id: 7, numero: 'FM-000007', nom: 'Yao', prenoms: 'Marc', sexe: 'M', dateNaissance: '1992-12-25',
    telephone: '2250707778899', commune: 'Yopougon', salle: 'Cocody', dateInscription: '2025-08-14',
    objectif: 'Perte de poids',
  },
  {
    id: 8, numero: 'FM-000008', nom: 'Diallo', prenoms: 'Mariam', sexe: 'F', dateNaissance: '1997-03-02',
    telephone: '2250708889900', commune: 'Treichville', salle: 'Plateau', dateInscription: '2026-05-05',
    objectif: 'Perte de poids',
  },
  {
    id: 9, numero: 'FM-000009', nom: 'Coulibaly', prenoms: 'Seydou', sexe: 'M', dateNaissance: '1985-10-11',
    telephone: '2250709990011', commune: 'Abobo', salle: 'Cocody', dateInscription: '2025-02-27',
    objectif: 'Remise en forme', sante: 'Douleurs au genou droit',
  },
  {
    id: 10, numero: 'FM-000010', nom: "N'Guessan", prenoms: 'Désiré', sexe: 'M', dateNaissance: '1995-08-19',
    telephone: '2250500112233', commune: 'Bingerville', salle: 'Cocody', dateInscription: '2026-11-12',
    objectif: 'Prise de masse',
  },
  {
    id: 11, numero: 'FM-000011', nom: 'Touré', prenoms: 'Salimata', sexe: 'F', dateNaissance: '2000-01-28',
    telephone: '2250500223344', commune: 'Plateau', salle: 'Plateau', dateInscription: '2026-11-13',
  },
];