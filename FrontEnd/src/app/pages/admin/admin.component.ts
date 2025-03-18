import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Administration</h1>
    </div>
  `
})
export class AdminComponent {} 