import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';




@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css'
})
export class StatistiquesComponent implements OnInit {
  candidats: any[] = []; // Liste des candidats avec leurs parrainages
  totalParrainagesRequis: number = 20; // Objectif de validation
  isLoading: boolean = true; // Pour gérer l'état de chargement
  errorMessage: string | null = null; // Pour afficher les erreurs

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.chargerCandidats();
    this.chargerConfiguration();
  }

  chargerCandidats() {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.apiService.getCandidats().subscribe({
      next: (data) => {
        this.candidats = data.map((c: any) => ({
          nom: c.nom || c.Nom || c.name || '',
          prenom: c.prenom || c.Prenom || '',
          parrainages: c.parrainages || c.Parrainages || 0
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des candidats:', error);
        this.errorMessage = 'Erreur lors du chargement des données. Veuillez réessayer plus tard.';
        this.isLoading = false;
      }
    });
  }

  chargerConfiguration(): void {
    this.apiService.getNombreTotalParrainages().subscribe({
      next: (response) => {
        console.log("Configuration reçue :", response);
        this.totalParrainagesRequis = response.total_parrainages_requis;
      },
      error: (err) => console.error('Erreur lors de la récupération de la configuration:', err)
    });
  }

  getProgression(parrainages: number): number {
    if (!parrainages || this.totalParrainagesRequis === 0) return 0;
    const percentage = Math.min((parrainages / this.totalParrainagesRequis) * 100, 100);
    return Math.round(percentage * 10) / 10;
  }

  getProgressionClass(parrainages: number): string {
    const percentage = this.getProgression(parrainages);
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-danger';
  }
}

