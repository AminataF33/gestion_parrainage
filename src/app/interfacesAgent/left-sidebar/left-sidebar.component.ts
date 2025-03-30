import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  imports: [RouterModule, CommonModule]
})
export class LeftSidebarComponent {
  items = [
    { 
      routeLink: 'gerer-periode-parrainage', 
      label: 'Gestion des Périodes',
      icon: 'fas fa-calendar-day' 
    },
    { 
      routeLink: 'importer-liste', 
      label: 'Importations des Électeurs',
      icon: 'fas fa-file-upload' 
    },
    { 
      routeLink: 'ajouter-candidat', 
      label: 'Enregistrement Candidat',
      icon: 'fas fa-user-plus' 
    },
    { 
      routeLink: 'afficher-candidats', 
      label: 'Liste des Candidats',
      icon: 'fas fa-users-cog' 
    },
    { 
      routeLink: 'monitoring', 
      label: 'Suivi des Parrainages',
      icon: 'fas fa-chart-line' 
    },
    { 
      routeLink: 'statistiques', 
      label: 'Analytiques Parrainages',
      icon: 'fas fa-chart-pie' 
    },
    { 
      routeLink: 'logout', 
      label: 'Déconnexion',
      icon: 'fas fa-sign-out-alt' 
    }
  ];

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog
  ) {}

  confirmLogout() {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '350px',
      data: { title: 'Confirmer la déconnexion' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  isLogoutActive(): boolean {
    return this.router.url === '/logout';
  }
}