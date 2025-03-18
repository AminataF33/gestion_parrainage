import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';


@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
closeSidenav() {
throw new Error('Method not implemented.');
}
 items = [
{
  routeLink : 'gerer-periode-parrainage',
  
  label : 'Periode Parrainage'
},
{
  routeLink : 'importer-liste',
  
  label : 'Importer Liste ELecteurs'
},
{
  routeLink : 'ajouter-candidat',
  
  label : 'Ajouter Candidat'
},
{
  routeLink : 'afficher-candidats',
  
  label : 'Afficher Candidats'
},
{
  routeLink : 'monitoring',
  
  label : 'Suivi Parrainage'
},
{
  routeLink : 'statistiques',
  
  label : 'Statistiques'
},
{
  routeLink : 'logout',
  
  label : 'Logout'
},
 ];

}
