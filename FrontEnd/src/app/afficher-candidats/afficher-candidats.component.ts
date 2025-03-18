import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-afficher-candidats',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './afficher-candidats.component.html',
  styleUrl: './afficher-candidats.component.css'
})
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
      couleurParti: '#FF0000',
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
      couleurParti: '#0000FF',
      authCode: null,
      showDetails: false
    },
    {
      nom: 'Moussa',
      prenom: 'Sarr',
      partiPolitique: 'Rassemblement National',
      email: 'moussa.sarr@example.com',
      telephone: '+221784567890',
      slogan: 'Pour un Sénégal fort',
      couleurParti: '#00FF00',
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
