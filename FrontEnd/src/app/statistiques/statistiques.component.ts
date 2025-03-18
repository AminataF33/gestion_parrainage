import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class StatistiquesComponent {
  totalParrainagesRequis = 1000;

  candidats = [
    { nom: 'Candidat A', parrainages: 450, evolution: [
      { name: '2025-02-25', value: 100 },
      { name: '2025-02-26', value: 200 },
      { name: '2025-02-27', value: 300 },
      { name: '2025-02-28', value: 350 },
      { name: '2025-03-01', value: 400 },
      { name: '2025-03-02', value: 420 },
      { name: '2025-03-03', value: 450 }
    ]},
    { nom: 'Candidat B', parrainages: 380, evolution: [
      { name: '2025-02-25', value: 50 },
      { name: '2025-02-26', value: 150 },
      { name: '2025-02-27', value: 220 },
      { name: '2025-02-28', value: 270 },
      { name: '2025-03-01', value: 300 },
      { name: '2025-03-02', value: 350 },
      { name: '2025-03-03', value: 380 }
    ]}
  ];

  // Ajout du pourcentage de progression
  results = this.candidats.map(c => ({
    name: c.nom,
    series: c.evolution,
    tauxProgression: ((c.parrainages / this.totalParrainagesRequis) * 100).toFixed(2) + '%'
  }));

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  autoScale = true;
}