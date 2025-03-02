import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = '/api/candidats'; // This would be the actual API endpoint in production

  constructor(private http: HttpClient) {}

  // Search for a candidate by elector number
  searchByElectorNumber(electorNumber: string): Observable<any> {
    // In a real application, we would call the API
    // return this.http.get(`${this.apiUrl}/search?electorNumber=${electorNumber}`);
    
    // For demonstration, we'll simulate the response
    if (electorNumber === '12345678') {
      return of({
        found: true,
        candidat: {
          electorNumber: '12345678',
          nom: 'Ndiaye',
          prenom: 'Moussa',
          dateNaissance: '1982-08-10'
        }
      });
    } else if (electorNumber === '87654321') {
      return of({
        found: false,
        message: 'Candidat déjà enregistré !'
      });
    } else {
      return of({
        found: false,
        message: 'Le candidat considéré n\'est pas présent dans le fichier électoral'
      });
    }
  }

  // Register a new candidate
  registerCandidat(candidatInfo: any): Observable<any> {
    // In a real application, we would call the API
    // return this.http.post(`${this.apiUrl}/register`, candidatInfo);
    
    // For demonstration, we'll simulate the response
    return of({
      success: true,
      message: 'Le candidat a été enregistré avec succès.',
      securityCode: '12345'
    });
  }

  // Get the list of candidates
  getCandidats(): Observable<any[]> {
    // In a real application, we would call the API
    // return this.http.get<any[]>(`${this.apiUrl}`);
    
    // For demonstration, we'll simulate the response
    return of([
      {
        id: 1,
        nom: 'Diop',
        prenom: 'Amadou',
        dateNaissance: '1975-05-15',
        partiPolitique: 'Parti de l\'Unité Nationale',
        email: 'amadou.diop@example.com',
        telephone: '221770001122',
        slogan: 'Ensemble pour un Sénégal meilleur',
        photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        couleur1: '#008000',
        couleur2: '#FFFFFF',
        couleur3: '#FF0000',
        siteWeb: 'https://example.com/amadou-diop'
      },
      {
        id: 2,
        nom: 'Sow',
        prenom: 'Fatou',
        dateNaissance: '1980-10-22',
        partiPolitique: 'Alliance pour le Progrès',
        email: 'fatou.sow@example.com',
        telephone: '221780001122',
        slogan: 'Pour un avenir prospère',
        photoUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        couleur1: '#0000FF',
        couleur2: '#FFFF00',
        couleur3: '#FFFFFF',
        siteWeb: 'https://example.com/fatou-sow'
      }
    ]);
  }

  // Regenerate security code for a candidate
  regenerateSecurityCode(candidatId: number): Observable<any> {
    // In a real application, we would call the API
    // return this.http.post(`${this.apiUrl}/${candidatId}/regenerate-code`, {});
    
    // For demonstration, we'll simulate the response
    return of({
      success: true,
      message: 'Un nouveau code de sécurité a été envoyé au candidat.'
    });
  }

  // Get candidate details
  getCandidatDetails(candidatId: number): Observable<any> {
    // In a real application, we would call the API
    // return this.http.get(`${this.apiUrl}/${candidatId}`);
    
    // For demonstration, we'll simulate the response
    return of({
      id: candidatId,
      nom: 'Diop',
      prenom: 'Amadou',
      dateNaissance: '1975-05-15',
      partiPolitique: 'Parti de l\'Unité Nationale',
      email: 'amadou.diop@example.com',
      telephone: '221770001122',
      slogan: 'Ensemble pour un Sénégal meilleur',
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      couleur1: '#008000',
      couleur2: '#FFFFFF',
      couleur3: '#FF0000',
      siteWeb: 'https://example.com/amadou-diop'
    });
  }

  // Authenticate candidate
  authenticateCandidat(email: string, securityCode: string): Observable<any> {
    // In a real application, we would call the API
    // return this.http.post(`${this.apiUrl}/authenticate`, { email, securityCode });
    
    // For demonstration, we'll simulate the response
    if (email === 'candidat@example.com' && securityCode === '12345') {
      return of({
        success: true,
        candidatId: 1
      });
    } else {
      return of({
        success: false,
        message: 'Adresse email ou code de sécurité incorrect.'
      });
    }
  }

  verifyVoterCard(cardNumber: string): Observable<any> {
    // Simuler une vérification avec un délai
    return of({
      exists: true,
      isRegistered: false,
      candidate: {
        nom: 'Diop',
        prenom: 'Mamadou',
        dateNaissance: '1975-03-15'
      }
    });
  }

registerCandidate(candidateData: any): Observable<any> {
  // Simuler l'enregistrement
  return of({
    success: true,
    message: 'Candidature enregistrée avec succès'
  });
}
}
