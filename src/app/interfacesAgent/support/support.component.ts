import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { MainComponent } from '../main/main.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, LeftSidebarComponent, MainComponent, RouterModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

}
