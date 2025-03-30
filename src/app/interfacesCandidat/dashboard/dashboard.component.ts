import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  parrainages: any[] = [];
  filteredParrainages: any[] = [];
  candidatNom: string = '';
  candidatPrenom: string = '';
  lieuxNaissance: string[] = [];
  selectedLieu: string = 'Tous';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const candidatId = localStorage.getItem('candidat_id');
    this.candidatNom = localStorage.getItem('candidat_nom') || '';
    this.candidatPrenom = localStorage.getItem('candidat_prenom') || '';

    if (candidatId) {
      this.apiService.getParrainagesCandidat(+candidatId).subscribe(data => {
        this.parrainages = data;
        this.filteredParrainages = [...this.parrainages];
        this.extractUniqueLieuxNaissance();
      });
    }
  }

  private extractUniqueLieuxNaissance() {
    const lieux = this.parrainages.map(p => p.electeur.lieu_naissance);
    this.lieuxNaissance = ['Tous', ...new Set(lieux)]; // 'Tous' + lieux uniques
  }

  filterByLieuNaissance(lieu: string) {
    this.selectedLieu = lieu;
    if (lieu === 'Tous') {
      this.filteredParrainages = [...this.parrainages];
    } else {
      this.filteredParrainages = this.parrainages.filter(
        p => p.electeur.lieu_naissance === lieu
      );
    }
  }

  sortByLieuNaissance(direction: 'asc' | 'desc') {
    this.filteredParrainages.sort((a, b) => {
      const lieuA = a.electeur.lieu_naissance.toLowerCase();
      const lieuB = b.electeur.lieu_naissance.toLowerCase();
      return direction === 'asc' 
        ? lieuA.localeCompare(lieuB) 
        : lieuB.localeCompare(lieuA);
    });
  }
}

