import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Electeur {
  numeroCarte: string;
  numeroCIN: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  bureauVote: string;
  telephone?: string;
  email?: string;
}

export interface Parrainage { 
  candidatId: string;
  electeurId: string;
  dateParrainage: Date;
  codeVerification: string;
}

@Injectable({
  providedIn: 'root'
})
export class ElecteurService {
  private apiUrl = `${environment.apiUrl}/electeurs`;

  constructor(private http: HttpClient) {}

  // Vérifier l'identité de l'électeur
  verifierIdentite(numeroCarte: string, numeroCIN: string): Observable<Electeur> {
    return this.http.post<Electeur>(`${this.apiUrl}/verifier`, { numeroCarte, numeroCIN });
  }

  // Enregistrer un parrainage
  enregistrerParrainage(parrainage: Parrainage): Observable<any> {
    return this.http.post(`${this.apiUrl}/parrainage`, parrainage);
  }

  // Vérifier si un électeur a déjà parrainé
  verifierParrainageExistant(electeurId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${electeurId}/parrainage-existant`);
  }
}
