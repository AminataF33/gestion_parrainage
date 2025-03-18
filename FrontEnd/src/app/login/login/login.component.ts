import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./login.component.html`,
  styleUrl: `./login.component.css`
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  onSubmit() {
    console.log('Tentative de connexion avec:', this.loginData);
    // Ici, vous pouvez ajouter la logique de connexion
  }
}
// http://localhost:5000/api/auth/login