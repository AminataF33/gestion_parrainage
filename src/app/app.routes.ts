import { Routes } from '@angular/router';
import { LoginComponent } from './interfacesAgent/login/login.component'
import { SupportComponent } from './interfacesAgent/support/support.component'
import { GererPeriodeParrainageComponent } from './interfacesAgent/gerer-periode-parrainage/gerer-periode-parrainage.component';
import { AjouterCandidatComponent } from './interfacesAgent/ajouter-candidat/ajouter-candidat.component';
import { ImporterListeComponent } from './interfacesAgent/importer-liste/importer-liste.component';
import { MonitoringComponent } from './interfacesAgent/monitoring/monitoring.component';
import { StatistiquesComponent } from './interfacesAgent/statistiques/statistiques.component';
import { LogoutComponent } from './interfacesAgent/logout/logout.component';
import { AfficherCandidatsComponent } from './interfacesAgent/afficher-candidats/afficher-candidats.component';
import { CandidatComponent } from './interfacesCandidat/candidat/candidat.component';
import { DashboardComponent } from './interfacesCandidat/dashboard/dashboard.component';
import { ProfilComponent } from './interfacesCandidat/profil/profil.component';
import { LayoutComponent } from './interfacesCandidat/layout/layout.component';
import { ElecteurParrainComponent } from './interfacesElecteur/electeur-parrain/electeur-parrain.component';
import { AccueilComponent } from './accueil/accueil.component';


export const routes: Routes = [

    { path: '', component: AccueilComponent },

    { path: 'elcteur', component: ElecteurParrainComponent },
    {path : 'layout',
        component: LayoutComponent,
        children : [
            {path : '',
                component : DashboardComponent
             },
            {path : 'dashboard',
                component : DashboardComponent
             },
             {path : 'profil',
                component : ProfilComponent
             }
        ]
       },
    
    {path : 'candidat',
        component: CandidatComponent    
    },
    {path : 'electeur',
        component:  ElecteurParrainComponent 
    },   

    
    {path : 'login',
     component: LoginComponent    
    },
    {path : 'support',
        component : SupportComponent,
        children : [ 
            
           {path : 'ajouter-candidat',
            component : AjouterCandidatComponent  
           },
           {path : 'afficher-candidats',
            component : AfficherCandidatsComponent 
           },
           {path : 'gerer-periode-parrainage',
            component : GererPeriodeParrainageComponent   
           },   
           {path : 'importer-liste',
            component : ImporterListeComponent
           }, 
           {path : 'monitoring',
            component : MonitoringComponent
           },
           {path : 'statistiques',
            component : StatistiquesComponent   
           },
           {path : 'logout',
            component : LogoutComponent  
           }]
    }
];
