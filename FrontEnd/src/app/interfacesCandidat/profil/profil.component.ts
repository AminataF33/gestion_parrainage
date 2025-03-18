import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from '../../shared/services/candidat.service'; // Ajustez le chemin selon votre structure
import { HttpClientModule } from '@angular/common/http'; // Nécessaire pour standalone component

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Ajout de HttpClientModule
  templateUrl: `profil.component.html`,
  styleUrls: [`profil.component.css`]
})
export class ProfilComponent implements OnInit {
  loading: boolean = true;
  candidat: any = null;
  updateSuccess: boolean = false;
  updateError: string = '';
  candidatId: number = 1; 

  constructor(
    private router: Router,
    private candidatService: CandidatService // Injection du service
  ) {}

  ngOnInit(): void {
    this.loadCandidatProfile();
  }

  loadCandidatProfile(): void {
    this.loading = true;
    this.candidatService.getCandidatDetails(this.candidatId).subscribe({
      next: (data) => {
        this.candidat = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.loading = false;
        this.updateError = 'Erreur lors du chargement du profil. Veuillez réessayer.';
      }
    });
  }

  updateProfile(): void {
    this.updateSuccess = false;
    this.updateError = '';
    this.loading = true;
    
    this.candidatService.registerCandidat(this.candidat).subscribe({
      next: (response) => {
        this.updateSuccess = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
        this.updateError = 'Erreur lors de la mise à jour. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  regenerateCode(): void {
    if (confirm('Êtes-vous sûr de vouloir générer un nouveau code de sécurité ? Votre ancien code ne sera plus valide.')) {
      this.loading = true;
      this.candidatService.regenerateSecurityCode(this.candidatId).subscribe({
        next: (response) => {
          alert('Un nouveau code de sécurité a été généré.');
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la génération du code:', error);
          alert('Erreur lors de la génération du code. Veuillez réessayer.');
          this.loading = false;
        }
      });
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/candidat/dashboard']);
  }
}