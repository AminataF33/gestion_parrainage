import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PeriodeParrainage {
  dateDebut: Date;
  dateFin: Date;
}

export interface Candidat {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  numeroCandidat: string;
  statut: 'ACTIF' | 'INACTIF';
}

export interface ImportResult {
  success: boolean;
  totalLines: number;
  processedLines: number;
  errors: any[];
}

export interface MonitoringStats {
  totalElecteurs: number;
  totalParrainages: number;
  parrainagesParCandidat: {
    candidatId: number;
    nom: string;
    prenom: string;
    nombreParrainages: number;
  }[];
  derniersParrainages: {
    date: Date;
    electeur: string;
    candidat: string;
  }[];
  statutPeriode: {
    active: boolean;
    dateDebut: Date;
    dateFin: Date;
  };
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // Authentification
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  // Gestion des candidats
  ajouterCandidat(candidat: Candidat): Observable<Candidat> {
    return this.http.post<Candidat>(`${this.apiUrl}/candidats`, candidat);
  }

  getCandidats(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.apiUrl}/candidats`);
  }

  // Gestion de la période de parrainage
  definirPeriodeParrainage(periode: PeriodeParrainage): Observable<PeriodeParrainage> {
    return this.http.post<PeriodeParrainage>(`${this.apiUrl}/periode-parrainage`, periode);
  }

  getPeriodeParrainage(): Observable<PeriodeParrainage> {
    return this.http.get<PeriodeParrainage>(`${this.apiUrl}/periode-parrainage`);
  }

  // Import de la liste électorale
  importerListeElectorale(file: File, checksum: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('checksum', checksum);

    const req = new HttpRequest('POST', `${this.apiUrl}/importer-electeurs`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  validerImportation(): Observable<ImportResult> {
    return this.http.post<ImportResult>(`${this.apiUrl}/valider-importation`, {});
  }

  getErreursImportation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/erreurs-importation`);
  }

  // Monitoring
  getStatistiquesMonitoring(): Observable<MonitoringStats> {
    return this.http.get<MonitoringStats>(`${this.apiUrl}/monitoring/stats`);
  }

  getLogsSysteme(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/monitoring/logs`);
  }

  getStatutSysteme(): Observable<{
    status: 'OK' | 'WARNING' | 'ERROR';
    message: string;
    timestamp: Date;
  }> {
    return this.http.get<{
      status: 'OK' | 'WARNING' | 'ERROR';
      message: string;
      timestamp: Date;
    }>(`${this.apiUrl}/monitoring/status`);
  }
}