import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParrainageService {

  private apiUrl = 'http://localhost:5000/api'; // L'URL de l'API backend

  constructor(private http: HttpClient) {}

  // Enregistrer un parrainage
  registerParrainage(electorId: string, candidatId: number, confirmationCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/parrainages`, { electorId, candidatId, confirmationCode });
  }

  // Récupérer les parrainages d'un candidat
  getCandidatParrainages(candidatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidats/${candidatId}/parrainages`);
  }

  // Récupérer les statistiques quotidiennes d'un candidat
  getDailyStatistics(candidatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidats/${candidatId}/daily-statistics`);
  }

  // Récupérer les statistiques générales d'un candidat
  getCandidatStatistics(candidatId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidats/${candidatId}/statistics`);
  }

  // Vérifier un parrainage avec le code de vérification
  verifyParrainage(verificationCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/parrainages/verify/${verificationCode}`);
  }

  // Enregistrer la période de parrainage
  savePeriod(startDate: string, endDate: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/period`, { startDate, endDate });
  }

  // Récupérer la période de parrainage actuelle
  getCurrentPeriod(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/period`);
  }

  // Vérifier si la période de parrainage est active
  isPeriodActive(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/period/active`);
  }
}
