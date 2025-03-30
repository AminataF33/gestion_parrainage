import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `profil.component.html`,
  styleUrls: [`profil.component.css`]
})
export class ProfilComponent implements OnInit {
  candidat: any = null;
  updateSuccess: boolean = false;
  updateError: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const candidatId = localStorage.getItem('candidat_id');
    if (candidatId) {
      this.loadCandidatProfile(parseInt(candidatId));
    } else {
      this.router.navigate(['/login']); // Redirige vers la connexion si non connecté
    }
  }

  loadCandidatProfile(candidatId: number): void {
    this.apiService.getCandidatById(candidatId).subscribe({
      next: (data) => {
        this.candidat = data;
        // Ajoute un avatar par défaut si aucune photo n'est fournie
        if (!this.candidat.photo) {
          this.candidat.photo = 'assets/default-avatar.png';
        }
      },
      error: () => {
        this.updateError = 'Erreur lors du chargement des informations.';
      }
    });
  }

  updateProfile(): void {
    console.log("Données envoyées :", this.candidat);
  
    this.apiService.updateCandidat(this.candidat.id, this.candidat).subscribe({
      next: () => {
        console.log("Mise à jour réussie !");
        this.updateSuccess = true;
        this.updateError = "";
      },
      error: (err) => {
        console.error("Erreur API :", err);
        this.updateError = `Erreur lors de la mise à jour : ${err.message}`;
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/layout/dashboard']);
  }
}















