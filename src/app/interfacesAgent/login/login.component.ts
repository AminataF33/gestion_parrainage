import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';  // Assure-toi d'importer le service
import { Router } from '@angular/router';  // Pour rediriger après la connexion réussie

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./login.component.html`,
  styleUrls: [`./login.component.css`]
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  errorMessage: string = '';  // Variable pour afficher un message d'erreur

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    console.log('Tentative de connexion avec:', this.loginData);
    
    // Appeler le service pour envoyer les données de connexion à l'API Django
    this.apiService.login(this.loginData.username, this.loginData.password).subscribe(
      (response) => {
        // Sauvegarder les tokens JWT dans le localStorage ou sessionStorage
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);

        // Rediriger l'utilisateur vers la page d'accueil ou une autre page
        this.router.navigate(['/support']);  // Change cette URL selon ta configuration
      },
      (error) => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    );
  }
}
