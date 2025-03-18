import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './../../left-sidebar/left-sidebar.component';
import { MainComponent } from './../../main/main.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  imports: [CommonModule, LeftSidebarComponent, MainComponent, RouterModule],
  standalone: true,
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
