import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfilComponent } from "../profil/profil.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, /*DashboardComponent, ProfilComponent*/],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
