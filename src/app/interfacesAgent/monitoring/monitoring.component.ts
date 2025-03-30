import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit {
  selectedDate: string = '';
  candidatesData: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMonitoringData();
  }

  loadMonitoringData() {
    this.apiService.getMonitoringData(this.selectedDate)
      .subscribe(
        (data) => {
          this.candidatesData = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des données:', error);
        }
      );
  }

  onDateChange() {
    this.loadMonitoringData();
  }
}

/*
export class MonitoringComponent implements OnInit {

  selectedDate: string = '';
  candidates: any[] = [];
  filteredCandidates: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.apiService.getCandidats().subscribe(
      (data) => {
        this.candidates = data;
        this.filteredCandidates = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidats', error);
      }
    );
  }

  toggleDetails(candidate: any): void {
    candidate.showDetails = !candidate.showDetails;
  }

  onDateChange(): void {
    if (this.selectedDate) {
      this.filteredCandidates = this.candidates.filter(candidate =>
        candidate.dateAjout === this.selectedDate
      );
    } else {
      this.filteredCandidates = this.candidates;
    }
  }
}
*/



/*
export class MonitoringComponent {

  selectedDate: string = '';
  candidates = [
    {
      nom: 'Diarra',
      prenom: 'Mamadou',
      partiPolitique: 'Parti A',
      parrainagesValides: 120,
      totalParrainages: 150,
      email: 'diarra.mamadou@example.com',
      telephone: '+221123456789',
      slogan: 'Un avenir meilleur',
      url: 'https://parti-a.com',
      showDetails: false,
      dateAjout: '2025-03-01'
    },
    {
      nom: 'Sow',
      prenom: 'Fatou',
      partiPolitique: 'Parti B',
      parrainagesValides: 80,
      totalParrainages: 100,
      email: 'sow.fatou@example.com',
      telephone: '+221987654321',
      slogan: 'Pour un Sénégal unifié',
      url: 'https://parti-b.com',
      showDetails: false,
      dateAjout: '2025-03-02'
    }
  ];
  filteredCandidates = this.candidates;

  toggleDetails(candidate: any) {
    candidate.showDetails = !candidate.showDetails;
  }

  onDateChange() {
    if (this.selectedDate) {
      this.filteredCandidates = this.candidates.filter(candidate =>
        candidate.dateAjout === this.selectedDate
      );
    } else {
      this.filteredCandidates = this.candidates;
    }
  }
}

*/