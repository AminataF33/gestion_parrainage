import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParrainageService {
  //getDailyStatistics(candidatId: number) {
    //throw new Error('Method not implemented.');
  //}
  getDailyStatistics(candidatId: number): Observable<any[]> {
    // En production, tu devrais faire une requête API :
    // return this.http.get<any[]>(`${this.apiUrl}/candidat/${candidatId}/daily-statistics`);
  
    // Simulation de réponse pour le test
    return of([
      { date: new Date(2025, 5, 10), count: 120 },
      { date: new Date(2025, 5, 11), count: 150 },
      { date: new Date(2025, 5, 12), count: 180 },
      { date: new Date(2025, 5, 13), count: 200 },
      { date: new Date(2025, 5, 14), count: 220 }
    ]);
  }
  
  private apiUrl = '/api/parrainages'; // This would be the actual API endpoint in production

  constructor(private http: HttpClient) {}

  // Save sponsorship period
  savePeriod(startDate: string, endDate: string): Observable<any> {
    // In a real application, we would call the API
    // return this.http.post(`${this.apiUrl}/period`, { startDate, endDate });
    
    // For demonstration, we'll simulate the response
    return of({
      success: true,
      message: 'La période de parrainage a été enregistrée avec succès.'
    });
  }

  // Get current sponsorship period
  getCurrentPeriod(): Observable<any> {
    // In a real application, we would call the API
    // return this.http.get(`${this.apiUrl}/period`);
    
    // For demonstration, we'll simulate the response
    return of({
      startDate: new Date(2025, 5, 1), // June 1, 2025
      endDate: new Date(2025, 7, 31)   // August 31, 2025
    });
  }

  // Check if sponsorship period is active
  isPeriodActive(): Observable<boolean> {
    // In a real application, we would call the API
    // return this.http.get<boolean>(`${this.apiUrl}/period/active`);
    
    // For demonstration, we'll simulate the response
    const today = new Date();
    const startDate = new Date(2025, 5, 1); // June 1, 2025
    const endDate = new Date(2025, 7, 31);   // August 31, 2025
    
    return of(today >= startDate && today <= endDate);
  }

  // Register a sponsorship
  registerParrainage(electorId: string, candidatId: number, confirmationCode: string): Observable<any> {
    // In a real application, we would call the API
    // return this.http.post(`${this.apiUrl}/register`, { electorId, candidatId, confirmationCode });
    
    // For demonstration, we'll simulate the response
    if (confirmationCode === '54321') {
      return of({
        success: true,
        message: 'Votre parrainage a été enregistré avec succès.',
        verificationCode: 'ABC123XYZ'
      });
    } else {
      return of({
        success: false,
        message: 'Code de confirmation incorrect.'
      });
    }
  }

  // Get sponsorships for a candidate
  getCandidatParrainages(candidatId: number): Observable<any[]> {
    // In a real application, we would call the API
    //return this.http.get<any[]>(`${this.apiUrl}/candidat/${candidatId}`);
    
    // For demonstration, we'll simulate the response
    return of([
      { date: new Date(2025, 5, 15, 10, 30), region: 'Dakar', departement: 'Dakar', verificationCode: 'ABC123' },
      { date: new Date(2025, 5, 15, 9, 45), region: 'Thiès', departement: 'Thiès', verificationCode: 'DEF456' },
      { date: new Date(2025, 5, 15, 9, 20), region: 'Dakar', departement: 'Rufisque', verificationCode: 'GHI789' },
      { date: new Date(2025, 5, 15, 8, 55), region: 'Saint-Louis', departement: 'Saint-Louis', verificationCode: 'JKL012' },
      { date: new Date(2025, 5, 15, 8, 30), region: 'Dakar', departement: 'Pikine', verificationCode: 'MNO345' }
    ]);
  }

  // Get sponsorship statistics for a candidate
  getCandidatStatistics(candidatId: number): Observable<any> {
    // In a real application, we would call the API
    // return this.http.get(`${this.apiUrl}/candidat/${candidatId}/statistics`);
    
    // For demonstration, we'll simulate the response
    return of({
      totalParrainages: 32456,
      newParrainages: 245,
      regions: [
        { name: 'Dakar', count: 12500 },
        { name: 'Thiès', count: 8200 },
        { name: 'Saint-Louis', count: 5400 },
        { name: 'Ziguinchor', count: 3100 },
        { name: 'Kaolack', count: 3256 }
      ]
    });
  }

  
  // Verify a sponsorship using the verification code
  verifyParrainage(verificationCode: string): Observable<any> {
    // In a real application, we would call the API
    // return this.http.get(`${this.apiUrl}/verify/${verificationCode}`);
    
    // For demonstration, we'll simulate the response
    return of({
      success: true,
      electorInfo: {
        nom: 'Diallo',
        prenom: 'Ibrahim'
      },
      candidatInfo: {
        nom: 'Diop',
        prenom: 'Amadou',
        partiPolitique: 'Parti de l\'Unité Nationale'
      },
      date: new Date(2025, 5, 15, 10, 30)
    });
  }
}