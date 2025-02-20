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

export const routes: Routes = [
    {path : '',
     component : LoginComponent   
    },
    {path : 'login',
     component: LoginComponent    
    },
    {path : 'dashbord',
        component : DashbordComponent,
        children : [ {path : 'ajouter-candidat',
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
