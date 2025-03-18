import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ParrainageService } from '../../shared/services/parrainage.service';
import { CandidatService } from '../../shared/services/candidat.service';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-candidat-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: `candidat-dashboard.component.html`,
  providers: [ParrainageService, CandidatService]
})
export class CandidatDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('evolutionChart') evolutionChartRef!: ElementRef;
  
  loading: boolean = true;
  totalParrainages: number = 0;
  newParrainages: number = 0;
  daysRemaining: number = 0;
  targetParrainages: number = 50000; // Example target
  progressPercentage: number = 0;
  
  regions: any[] = [];
  recentParrainages: any[] = [];
  candidatId: number = 1; // This would come from authentication service in a real app
  
  dailyStatistics: any[] = [];
  evolutionChart: Chart | null = null;

  constructor(
    private router: Router,
    private parrainageService: ParrainageService,
    private candidatService: CandidatService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  ngAfterViewInit(): void {
    // Chart will be initialized after data is loaded
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Get sponsorship statistics
    this.parrainageService.getCandidatStatistics(this.candidatId)
      .subscribe({
        next: (stats) => {
          this.totalParrainages = stats.totalParrainages;
          this.newParrainages = stats.newParrainages;
          this.regions = stats.regions;
          this.progressPercentage = Math.round((this.totalParrainages / this.targetParrainages) * 100);
          
          // Calculate days remaining
          this.parrainageService.getCurrentPeriod()
            .subscribe({
              next: (period) => {
                const today = new Date();
                const endDate = new Date(period.endDate);
                const diffTime = Math.abs(endDate.getTime() - today.getTime());
                this.daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                // Get recent sponsorships
                this.parrainageService.getCandidatParrainages(this.candidatId)
                  .subscribe({
                    next: (parrainages) => {
                      this.recentParrainages = parrainages;
                      
                      // Get daily statistics for the chart
                      this.parrainageService.getDailyStatistics(this.candidatId)
                        .subscribe({
                          next: (dailyStats: any[]) => {
                            this.dailyStatistics = dailyStats;
                            this.loading = false;
                            
                            // Initialize chart after data is loaded
                            setTimeout(() => {
                              this.initEvolutionChart();
                            }, 0);
                          },
                          error: (error: any) => {
                            console.error('Error loading daily statistics:', error);
                            this.loading = false;
                          }
                        });
                    },
                    error: (error) => {
                      console.error('Error loading sponsorships:', error);
                      this.loading = false;
                    }
                  });
              },
              error: (error) => {
                console.error('Error loading period:', error);
                this.loading = false;
              }
            });
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
          this.loading = false;
        }
      });
  }
  
  initEvolutionChart(): void {
    if (!this.evolutionChartRef) {
      return;
    }
    
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
            title: {
              display: true,
              text: 'Nombre de parrainages'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    });
  }

  exportParrainages(): void {
    // Convert parrainages to CSV format
    const headers = 'Date,Region,Departement,Code de verification\n';
    const csvData = this.recentParrainages.map(p => {
      const date = new Date(p.date).toLocaleDateString('fr-FR') + ' ' + 
                  new Date(p.date).toLocaleTimeString('fr-FR');
      return `${date},${p.region},${p.departement},${p.verificationCode}`;
    }).join('\n');
    
    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `parrainages_${new Date().toISOString().split('T')[0]}.csv`);
  }

  logout(): void {
    // In a real application, we would call the authentication service to logout
    this.router.navigate(['/candidat']);
  }
}