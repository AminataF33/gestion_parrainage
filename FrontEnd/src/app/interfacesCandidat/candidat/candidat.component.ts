import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  login() {
    // Reset any previous error
    this.loginError = null;

    // Simple validation
    if (!this.email || !this.securityCode) {
      this.loginError = 'Veuillez remplir tous les champs';
      return;
    }

    // Here you would typically call a service to authenticate
    // For demo purposes, we'll just simulate a successful login
    console.log('Tentative de connexion avec:', {
      email: this.email,
      securityCode: this.securityCode
    });

    /* Simulate API call
    setTimeout(() => {
      if (this.email === 'test@example.com' && this.securityCode === '123456') {
        alert('Connexion réussie!');
        // Here you would redirect to dashboard or home page
      } else {
        this.loginError = 'Email ou code de sécurité incorrect';
      }
    }, 1000);*/
  }
}

