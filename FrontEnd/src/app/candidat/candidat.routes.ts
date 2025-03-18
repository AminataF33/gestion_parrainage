import { Routes } from '@angular/router';
import { CandidatLayoutComponent } from './candidat-layout/candidat-layout.component';

export const CANDIDAT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./candidat-login/candidat-login.component').then(m => m.CandidatLoginComponent)
  },
  {
    path: '',
    component: CandidatLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./candidat-dashboard/candidat-dashboard.component').then(m => m.CandidatDashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./candidat-profile/candidat-profile.component').then(m => m.CandidatProfileComponent)
      },
      {
        path: 'verification',
        loadComponent: () => import('./candidat-verification/candidat-verification.component').then(m => m.CandidatVerificationComponent)
      }
    ]
  }
];