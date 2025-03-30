import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent {
  email: string = '';
  securityCode: string = '';
  loginError: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.loginError = null;
  
    if (!this.email || !this.securityCode) {
      this.loginError = 'Veuillez remplir tous les champs';
      return;
    }
  
    this.apiService.loginCandidat(this.email, this.securityCode).subscribe(
      (data) => {
        if (data.success) {
          // Stocker les informations du candidat dans le localStorage
          localStorage.setItem('candidat_id', data.candidat_id);
          localStorage.setItem('candidat_nom', data.nom);
          localStorage.setItem('candidat_prenom', data.prenom);
  
          // Rediriger vers l'espace candidat ou une autre page
          this.router.navigate(['/layout/dashboard']);
        } else {
          this.loginError = data.error;
        }
      },
      (error) => {
        this.loginError = 'Une erreur s\'est produite lors de la connexion';
      }
    );
  }
}




