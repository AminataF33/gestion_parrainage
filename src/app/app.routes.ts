import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component'
import { DashbordComponent } from './pages/dashbord/dashbord.component'
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


export const routes: Routes = [
    {path : '',
     component : LoginComponent   
    },
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
   /* {path: 'candidat',
    loadChildren: () => import('./candidat/candidat.routes').then(m => m.CANDIDAT_ROUTES)
    }, */
    
    {path : 'login',
     component: LoginComponent    
    },
    {path : 'dashbord',
        component : DashbordComponent,
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
