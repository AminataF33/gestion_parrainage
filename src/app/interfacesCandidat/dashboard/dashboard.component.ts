import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('evolutionChart') evolutionChartRef!: ElementRef;

  loading: boolean = true;
  totalParrainages: number = 12000; // Valeur statique pour éviter les erreurs
  newParrainages: number = 500;
  daysRemaining: number = 30;
  targetParrainages: number = 50000; // Objectif de parrainages
  progressPercentage: number = 0;
  constructor(private router: Router) {}
  regions: any[] = [
    { name: 'Dakar', count: 4000 },
    { name: 'Thiès', count: 3000 },
    { name: 'Saint-Louis', count: 2000 }
  ];
  recentParrainages: any[] = [
    { date: '2025-03-01', region: 'Dakar', departement: 'Pikine', verificationCode: 'ABC123' },
    { date: '2025-03-02', region: 'Thiès', departement: 'Mbour', verificationCode: 'DEF456' }
  ];
  dailyStatistics: any[] = [
    { date: '2025-02-25', count: 300 },
    { date: '2025-02-26', count: 450 },
    { date: '2025-02-27', count: 500 }
  ];
  evolutionChart: Chart | null = null;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initEvolutionChart();
    }, 0);
  }

  loadDashboardData(): void {
    this.loading = false;
    this.progressPercentage = Math.round((this.totalParrainages / this.targetParrainages) * 100);
  }

  initEvolutionChart(): void {
    if (!this.evolutionChartRef) return;

    const ctx = this.evolutionChartRef.nativeElement.getContext('2d');

    if (this.evolutionChart) {
      this.evolutionChart.destroy();
    }

    const labels = this.dailyStatistics.map(stat => {
      const date = new Date(stat.date);
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    });

    const data = this.dailyStatistics.map(stat => stat.count);

    this.evolutionChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Parrainages par jour',
          data: data,
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: 'rgba(76, 175, 80, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Nombre de parrainages' }
          },
          x: {
            title: { display: true, text: 'Date' }
          }
        },
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        }
      }
    });
  }

  exportParrainages(): void {
    const headers = 'Date,Region,Departement,Code de verification\n';
    const csvData = this.recentParrainages.map(p => {
      const date = new Date(p.date).toLocaleDateString('fr-FR') + ' ' +
        new Date(p.date).toLocaleTimeString('fr-FR');
      return `${date},${p.region},${p.departement},${p.verificationCode}`;
    }).join('\n');

    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `parrainages_${new Date().toISOString().split('T')[0]}.csv`);
  }

 
}
