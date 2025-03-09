import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `profil.component.html`,
  styleUrls: [`profil.component.css`]
})
export class ProfilComponent implements OnInit {
  loading: boolean = true;
  candidat: any = null;
  updateSuccess: boolean = false;
  updateError: string = '';
  candidatId: number = 1; // This would come from authentication service in a real app

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCandidatProfile();
  }

  loadCandidatProfile(): void {
    this.loading = false;
    // Simule le chargement des données sans service
    this.candidat = {
      nom: 'Nom Exemple',
      prenom: 'Prénom Exemple',
      email: 'candidat@example.com'
    };
  }

  updateProfile(): void {
    this.updateSuccess = false;
    this.updateError = '';

    // Simulation de mise à jour
    setTimeout(() => {
      this.updateSuccess = true;
    }, 1000);
  }

  regenerateCode(): void {
    if (confirm('Êtes-vous sûr de vouloir générer un nouveau code de sécurité ? Votre ancien code ne sera plus valide.')) {
      // Simulation d'un nouveau code
      alert('Un nouveau code de sécurité a été généré.');
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/candidat/dashboard']);
  }
}
