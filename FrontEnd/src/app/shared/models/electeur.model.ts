export interface Electeur {
  id?: number;
  numeroCarteElecteur: string;
  numeroCIN: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  numeroBureauVote: string;
  email?: string;
  telephone?: string;
  codeAuthentification?: string;
}