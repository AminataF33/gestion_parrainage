import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = 'http://localhost:5000/api/candidats'; // Assurez-vous que cette URL correspond à votre API

  constructor(private http: HttpClient) {}

  // Recherche par numéro d'électeur
  searchByElectorNumber(electorNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?electorNumber=${electorNumber}`);
  }

  // Enregistrement d'un nouveau candidat
  registerCandidat(candidatInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, candidatInfo);
  }

  // Récupération de la liste des candidats
  getCandidats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Régénération du code de sécurité
  regenerateSecurityCode(candidatId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${candidatId}/regenerate-code`, {});
  }

  // Récupération des détails d'un candidat
  getCandidatDetails(candidatId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${candidatId}`);
  }

  // Authentification du candidat
  authenticateCandidat(email: string, securityCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, { email, securityCode });
  }

  // Vérification de la carte d'électeur
  verifyVoterCard(cardNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-voter-card?cardNumber=${cardNumber}`);
  }

  // Enregistrement d'un candidat
  registerCandidate(candidateData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, candidateData);
  }
}