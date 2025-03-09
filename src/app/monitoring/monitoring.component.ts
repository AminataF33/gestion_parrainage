import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
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
