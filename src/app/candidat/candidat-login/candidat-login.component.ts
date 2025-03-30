import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from '../../shared/services/candidat.service';

@Component({
  selector: 'app-candidat-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `candidat-login.component.html`,
  providers: [CandidatService]
})
export class CandidatLoginComponent {
  email: string = '';
  securityCode: string = '';
  loginError: string = '';

  constructor(
    private router: Router,
    private candidatService: CandidatService
  ) {}

  login(): void {
    this.loginError = '';
    
  
    this.candidatService.authenticateCandidat(this.email, this.securityCode)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/candidat/dashboard']);
          } else {
            this.loginError = response.message || 'Adresse email ou code de sécurité incorrect.';
          }
        },
        error: (error) => {
          this.loginError = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
          console.error('Login error:', error);
        }
      });
  }
}