import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
 // Simulation d'appels API
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
  constructor() { }
}
