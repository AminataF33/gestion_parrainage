import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';  // URL de l'API Django pour obtenir un token

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/token/`, body);
  }

  refreshToken(refreshToken: string): Observable<any> {
    const body = { refresh: refreshToken };
    return this.http.post<any>(`${this.apiUrl}/token/refresh/`, body);
  }

  logout() {
    localStorage.removeItem('access_token'); // Supprime le token
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token'); // Vérifie si un token existe
  }
}
  



