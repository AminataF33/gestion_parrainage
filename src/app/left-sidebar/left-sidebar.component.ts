import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
 items = [
{
  routeLink : 'gerer-periode-parrainage',
  
  label : 'Periode_Parrainage'
},
{
  routeLink : 'importer-liste',
  
  label : 'Importer_Liste'
},
{
  routeLink : 'ajouter-candidat',
  
  label : 'Ajouter_Candidat'
},
{
  routeLink : 'afficher-candidats',
  
  label : 'Afficher_Candidats'
},
{
  routeLink : 'monitoring',
  
  label : 'Suivi_Parrainage'
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
