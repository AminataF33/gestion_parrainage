import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Candidat {
  id: number;
  nom: string;
  prenom: string;
  partiPolitique: string;
  photo: string;
  selected?: boolean;
}


@Component({
  selector: 'app-electeur-parrain',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './electeur-parrain.component.html',
  styleUrl: './electeur-parrain.component.css'
})
export class ElecteurParrainComponent implements OnInit {

  // États de l'interface
  etape: 'verification' | 'selection' | 'confirmation' | 'succes' | 'erreur' = 'verification';
  numeroCarteElecteur: string = '';
  electeurVerifie: boolean = false;
  messageErreur: string = '';
  candidatSelectionne: Candidat | null = null;
  
  // Données de l'électeur (simulées)
  electeur = {
    nom: '',
    prenom: '',
    region: '',
    circonscription: '',
    aDejaParraine: false
  };
  
  // Liste des candidats (simulée)
  candidats: Candidat[] = [
    {
      id: 1,
      nom: 'Diop',
      prenom: 'Amadou',
      partiPolitique: 'Parti du Progrès',
      photo: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      nom: 'Sow',
      prenom: 'Fatou',
      partiPolitique: 'Alliance pour le Développement',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      nom: 'Ndiaye',
      prenom: 'Moussa',
      partiPolitique: 'Union Démocratique',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 4,
      nom: 'Fall',
      prenom: 'Aïda',
      partiPolitique: 'Mouvement Citoyen',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialisation du composant
  }

  // Vérification du numéro de carte électeur
  verifierElecteur(): void {
    // Simulation de vérification - à remplacer par un appel au service
    if (this.numeroCarteElecteur && this.numeroCarteElecteur.length >= 8) {
      // Simulation de récupération des données de l'électeur
      this.electeur = {
        nom: 'Sarr',
        prenom: 'Mamadou',
        region: 'Dakar',
        circonscription: 'Parcelles Assainies',
        aDejaParraine: false
      };
      
      if (this.electeur.aDejaParraine) {
        this.messageErreur = 'Vous avez déjà parrainé un candidat.';
        this.etape = 'erreur';
      } else {
        this.electeurVerifie = true;
        this.etape = 'selection';
      }
    } else {
      this.messageErreur = 'Numéro de carte électeur invalide.';
    }
  }

  // Sélection d'un candidat
  selectionnerCandidat(candidat: Candidat): void {
    this.candidats.forEach(c => c.selected = false);
    candidat.selected = true;
    this.candidatSelectionne = candidat;
  }

  // Confirmation du choix
  confirmerSelection(): void {
    if (this.candidatSelectionne) {
      this.etape = 'confirmation';
    }
  }

  // Validation finale du parrainage
  validerParrainage(): void {
    // Simulation de l'enregistrement du parrainage - à remplacer par un appel au service
    this.etape = 'succes';
    // Dans un cas réel, on enregistrerait le parrainage dans la base de données
  }

  // Retour à l'étape précédente
  retour(): void {
    switch (this.etape) {
      case 'selection':
        this.etape = 'verification';
        this.electeurVerifie = false;
        break;
      case 'confirmation':
        this.etape = 'selection';
        break;
      default:
        break;
    }
  }

  // Recommencer le processus
  recommencer(): void {
    this.etape = 'verification';
    this.numeroCarteElecteur = '';
    this.electeurVerifie = false;
    this.candidatSelectionne = null;
    this.candidats.forEach(c => c.selected = false);
  }

}
