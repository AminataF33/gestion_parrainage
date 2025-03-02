export interface Candidat {
  id: number;
  electorNumber: string;
  cinNumber: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  telephone: string;
  partiPolitique?: string;
  slogan: string;
  photoUrl: string;
  couleur1: string;
  couleur2: string;
  couleur3: string;
  siteWeb?: string;
  dateEnregistrement: Date;
}