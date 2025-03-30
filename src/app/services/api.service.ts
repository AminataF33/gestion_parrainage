import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'  // Fournir le service globalement
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de ton backend Django

  constructor(private http: HttpClient, private router: Router) {}

  
  

  loginCandidat(email: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { email, code });
  }

  


  // Méthode pour récupérer les parrainages d'un candidat
  getParrainagesCandidat(candidatId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidats/${candidatId}/parrainages/`);
  }

   // Méthode pour récupérer un candidat par son ID
   getCandidatById(candidatId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidats/${candidatId}/`);
  }

  // Méthode pour mettre à jour le profil du candidat
  updateCandidat(candidatId: number, candidatData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/candidats/${candidatId}/`, candidatData, {
      headers: {"Content-Type": "application/json"}
    });
  }



  
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

  // Méthode pour importer un fichier CSV
 importElecteurs(formData: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/import-electeurs/`, formData);
 }

// Méthode pour valider l'importation des électeurs
 validerImportation(): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/valider-importation/`, {});
 }

  // Récupérer la période de parrainage actuelle
  

  getPeriodeParrainage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/periode-parrainage/`);
  }

  updatePeriodeParrainage(id: number, updatedPeriode: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/periode-parrainage/${id}/`, updatedPeriode);
  }


  verifierElecteur(numeroElecteur: string) {
    return this.http.get<{ exists: boolean; electeur_id?: number; nom?: string; prenom?: string }>(
      `${this.apiUrl}/verifier-electeur/${numeroElecteur}/`
    );
  }
  
  ajouterCandidat(data: any) {
    return this.http.post(`${this.apiUrl}/ajouter-candidat/`, data);
  }



   // Méthode pour récupérer tous les candidats
  getCandidats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidats/`);
  }

  getMonitoringData(date?: string): Observable<any> {
    const params: any = {};
    if (date) params.date = date;
    
    return this.http.get(`${this.apiUrl}/monitoring-parrainages/`, { params });
  }


  getNombreTotalParrainages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-parrainages/`);
  }
  
  getEvolutionParrainages(candidatId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/evolution-parrainages/${candidatId}/`).pipe(
      tap(response => console.log('Réponse de l’API:', response)),
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(error);
      })
    );
  }
  


  // Dans api.service.ts
  getElecteurParrainages(electeurId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/electeurs/${electeurId}/parrainages/`);
}


creerParrainage(electeurId: number, candidatId: number): Observable<any> {
  const data = {
    electeur: electeurId,  // Gardez 'electeur' et 'candidat' comme dans votre serializer Django
    candidat: candidatId
  };

  return this.http.post(`${this.apiUrl}/parrainer/`, data).pipe(
    catchError(error => {
      console.error('Erreur complète:', error);
      
      let errorMessage = 'Erreur lors du parrainage';
      if (error.error) {
        // Adapté pour le format d'erreur Django
        errorMessage = error.error.electeur?.[0] || 
                      error.error.candidat?.[0] || 
                      error.error.detail ||
                      error.error.message ||
                      JSON.stringify(error.error);
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
}


creerPeriode(periodeData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/periodes/`, periodeData);
}

checkPeriodeActive(): Observable<boolean> {
  return this.http.get<{is_active: boolean}>('/api/check-period/').pipe(
    map(response => response.is_active)
  );
}


}










