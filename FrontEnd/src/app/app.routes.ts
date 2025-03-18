import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { GererPeriodeParrainageComponent } from './gerer-periode-parrainage/gerer-periode-parrainage.component';
import { AjouterCandidatComponent } from './ajouter-candidat/ajouter-candidat.component';
import { ImporterListeComponent } from './importer-liste/importer-liste.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { LogoutComponent } from './logout/logout.component';
import { AfficherCandidatsComponent } from './afficher-candidats/afficher-candidats.component';
import { CandidatComponent } from './interfacesCandidat/candidat/candidat.component';
import { DashboardComponent } from './interfacesCandidat/dashboard/dashboard.component';
import { ProfilComponent } from './interfacesCandidat/profil/profil.component';
import { LayoutComponent } from './interfacesCandidat/layout/layout.component';
import { ElecteurParrainComponent } from './interfacesElecteur/electeur-parrain/electeur-parrain.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './interfacesCandidat/navbar/navbar.component';
import { VerificationComponent } from './interfacesCandidat/verification/verification.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent }
    ]
  },
  { path: 'interfacesCandidat',
     component: CandidatComponent, 
    children: [
      { path  : 'dashboard', component : DashboardComponent},
      { path  : 'layout', component : LayoutComponent},
      { path  : 'main', component : MainComponent},
      { path  : 'navbar', component : NavbarComponent},
      { path  : 'profil', component : ProfilComponent},
      { path  : 'verification', component : VerificationComponent}
    ]
  },
  
  { path: 'electeur', component: ElecteurParrainComponent },

  {
    path: 'dashbord',
    component: DashbordComponent,
    children: [
      { path: 'ajouter-candidat', component: AjouterCandidatComponent },
      { path: 'afficher-candidats', component: AfficherCandidatsComponent },
      { path: 'gerer-periode-parrainage', component: GererPeriodeParrainageComponent },
      { path: 'importer-liste', component: ImporterListeComponent },
      { path: 'monitoring', component: MonitoringComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
  { path: '**', redirectTo: '/accueil' }
];
