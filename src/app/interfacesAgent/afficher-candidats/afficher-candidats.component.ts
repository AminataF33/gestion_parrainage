import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-afficher-candidats',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './afficher-candidats.component.html',
  styleUrl: './afficher-candidats.component.css'
})
export class AfficherCandidatsComponent implements OnInit {
  
  candidats: any[] = [];  // Tableau vide qui va être rempli avec les données des candidats

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCandidats();  // Récupérer les candidats au chargement du composant
  }

  // Récupérer les candidats depuis l'API
  fetchCandidats() {
    this.apiService.getCandidats().subscribe(
      (response) => {
        this.candidats = response;  // Remplir le tableau avec les données récupérées
      },
      (error) => {
        console.error("Erreur lors de la récupération des candidats:", error);
      }
    );
  }

  // Toggle pour afficher/masquer les détails du candidat
  toggleDetails(candidat: any) {
    candidat.showDetails = !candidat.showDetails;
  }


}


/*
export class AfficherCandidatsComponent implements OnInit {

   // Liste des candidats avec des informations statiques
   candidats = [
    {
      nom: 'Jean',
      prenom: 'Dupont',
      partiPolitique: 'Parti Socialiste',
      email: 'jean.dupont@example.com',
      telephone: '+221712345678',
      slogan: 'Pour un avenir meilleur',
      
      authCode: null,
      showDetails: false
    },
    {
      nom: 'Amina',
      prenom: 'Fall',
      partiPolitique: 'Parti Démocratique',
      email: 'amina.fall@example.com',
      telephone: '+221753456789',
      slogan: 'Unité et progrès',
      
      authCode: null,
      showDetails: false
    },
    {
      nom: 'Moussa',
      prenom: 'Sarr',
      partiPolitique: 'Rassemblement National',
      email: 'moussa.sarr@example.com',
      telephone: '+221784567890',
      slogan: 'Pour un Sénégal for',
      site_web : '',
      authCode: null,
      showDetails: false
    }
  ];

  ngOnInit(): void {
    console.log('Candidats:', this.candidats); // Vérifiez si les candidats sont bien chargés
  }

  // Toggle pour afficher/masquer les détails du candidat
  toggleDetails(candidat: any) {
    candidat.showDetails = !candidat.showDetails;
  }

  // Générer un code d'authentification aléatoire pour chaque candidat
  generateAuthCode(candidat: any) {
    const code = Math.random().toString(36).substr(2, 8); // Génère un code aléatoire de 8 caractères
    candidat.authCode = code;

    // Simuler l'envoi de l'email (dans la réalité, vous enverrez un email avec ce code)
    console.log(`Code d'authentification envoyé à ${candidat.email}: ${code}`);
  }
}

*/