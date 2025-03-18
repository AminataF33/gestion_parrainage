import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CandidatNavbarComponent } from "../../candidat/candidat-navbar/candidat-navbar.component";

@Component({
  selector: 'app-candidat-layout',
  standalone: true,
  imports:[CommonModule, RouterOutlet, CandidatNavbarComponent],
  template: `
    <app-candidat-navbar></app-candidat-navbar>
    <div class="container">
      <router-outlet></router-outlet> 
    </div>
  `
})
export class CandidatLayoutComponent {}