import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { finalize } from 'rxjs';


interface Electeur {
  id: number;
  electeur_id?: number;
  cin: string;
  numero_electeur: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  bureau_vote: string;
  sexe: 'M'|'F';
  a_deja_parraine?: boolean;
}

interface Candidat {
  id: number;
  electeur: {
    id: number;
    nom: string;
    prenom: string;
  };
  parti_politique: string;
  email: string;
  telephone: string;
  slogan: string;
  site_web: string;
  selected?: boolean;
}


@Component({
  selector: 'app-electeur-parrain',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './electeur-parrain.component.html',
  styleUrl: './electeur-parrain.component.css'
})
export class ElecteurParrainComponent implements OnInit {
  etape: 'verification' | 'selection' | 'confirmation' | 'succes' | 'erreur' = 'verification';
  numeroCarteElecteur: string = '';
  messageErreur: string = '';
  isLoading: boolean = false;
  electeur: Electeur | null = null;
  candidats: any[] = [];
  
  candidatSelectionne: Candidat | null = null;
  electeurId: number | null = null; // Ajoutez cette propriété à votre classe
  candidatId: number | null = null; // Ajoutez cette propriété à votre classe
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCandidats();
    this.verifierElecteur();
  }

  loadCandidats(): void {
    this.isLoading = true;
    this.apiService.getCandidats().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (candidats: any[]) => {
        this.candidats = candidats.map(c => ({
          // Mappage des champs mal orthographiés
          id: c.id,
          electeur: {
            id: c.electeur,
            nom: c.nom || 'Nom inconnu',  // 'non' au lieu de 'nom'
            prenom: c.prenom || 'Prénom inconnu'
          },
          parti_politique: c.parti_politique || 'Parti inconnu',
          slogan: c.slogan || '',
          selected: false
        }));
      },
      error: (err) => {  }
    });
  }






  
  verifierElecteur(): void {
    if (!this.numeroCarteElecteur || this.numeroCarteElecteur.length < 8) {
      this.messageErreur = 'Le numéro doit contenir au moins 8 caractères';
      return;
    }

    this.isLoading = true;
    this.apiService.verifierElecteur(this.numeroCarteElecteur).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response: any) => {
        if (response.exists) {
          this.electeur = {
            ...response,
            id: response.electeur_id,
            a_deja_parraine: false
          };
          this.verifierParrainageExistant(response.electeur_id);
        } else {
          this.messageErreur = 'Aucun électeur trouvé avec ce numéro';
        }
      },
      error: (err) => {
        console.error('Erreur vérification électeur:', err);
        this.messageErreur = 'Erreur lors de la vérification. Veuillez réessayer.';
      }
    });
  }
  


  verifierParrainageExistant(candidatId: number): void {
    this.apiService.getParrainagesCandidat(candidatId).subscribe({
      next: (parrainages) => {
        if (parrainages && parrainages.length > 0) {
          this.messageErreur = 'Cet électeur a déjà parrainé un candidat';
          this.etape = 'erreur';
        } else {
          this.etape = 'selection';
        }
      },
      error: (err) => {
        console.error('Erreur vérification parrainage:', err);
        this.etape = 'selection'; // On continue malgré l'erreur
      }
    });
  }

  selectionnerCandidat(candidat: Candidat): void {

    // Désélectionner tous les autres candidats
    this.candidats.forEach(c => c.selected = false);
   
    
    // Sélectionner le candidat cliqué
    candidat.selected = true;
    this.candidatSelectionne = candidat;
  }

  confirmerSelection(): void {
    if (this.candidatSelectionne) {
      this.etape = 'confirmation';
    }
  }


  validerParrainage(): void {
    if (!this.electeur || !this.candidatSelectionne) {
      this.messageErreur = 'Données manquantes';
      return;
    }
  
    this.isLoading = true;
    
    this.apiService.creerParrainage(this.electeur.id, this.candidatSelectionne.id).subscribe({
      next: (response) => {
        console.log('Réponse:', response);
        this.etape = 'succes';
        if (this.electeur) {
          this.electeur.a_deja_parraine = true;
        }
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.messageErreur = err.message;
        this.etape = 'erreur';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }




  retour(): void {
    switch (this.etape) {
      case 'selection':
        this.etape = 'verification';
        this.electeur = null;
        break;
      case 'confirmation':
        this.etape = 'selection';
        break;
      default:
        break;
    }
    this.messageErreur = '';
  }

  recommencer(): void {
    this.etape = 'verification';
    this.numeroCarteElecteur = '';
    this.electeur = null;
    this.candidatSelectionne = null;
    this.candidats.forEach(c => c.selected = false);
    this.messageErreur = '';
  }


}
