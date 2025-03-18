import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidatService } from '../../shared/services/candidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidat-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `candidat-profile.component.html`,
  styleUrls: [`candidat-profile.component.css`],
  providers: [CandidatService]
})
export class CandidatProfileComponent implements OnInit {
  loading: boolean = true;
  candidat: any = null;
  updateSuccess: boolean = false;
  updateError: string = '';
  candidatId: number = 1; // This would come from authentication service in a real app

  constructor(
    private candidatService: CandidatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCandidatProfile();
  }

  loadCandidatProfile(): void {
    this.loading = true;
    
    this.candidatService.getCandidatDetails(this.candidatId)
      .subscribe({
        next: (candidat) => {
          this.candidat = candidat;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading candidate profile:', error);
          this.loading = false;
        }
      });
  }

  updateProfile(): void {
    this.updateSuccess = false;
    this.updateError = '';
    
    // In a real application, we would call the service to update the profile
    setTimeout(() => {
      this.updateSuccess = true;
    }, 1000);
  }

  regenerateCode(): void {
    if (confirm('Êtes-vous sûr de vouloir générer un nouveau code de sécurité ? Votre ancien code ne sera plus valide.')) {
      this.candidatService.regenerateSecurityCode(this.candidatId)
        .subscribe({
          next: (response) => {
            alert('Un nouveau code de sécurité a été envoyé à votre adresse email et votre numéro de téléphone.');
          },
          error: (error) => {
            console.error('Error regenerating security code:', error);
            alert('Une erreur est survenue lors de la génération du nouveau code.');
          }
        });
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/candidat/dashboard']);
  }
}