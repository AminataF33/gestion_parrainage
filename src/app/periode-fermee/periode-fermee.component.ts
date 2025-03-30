import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-periode-fermee',
  imports: [CommonModule,  MatButtonModule],
  standalone: true,
  templateUrl: './periode-fermee.component.html',
  styleUrl: './periode-fermee.component.css'
})
export class PeriodeFermeeComponent {
  returnUrl: string | null = null;
  reason: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.reason = this.route.snapshot.queryParams['reason'];
  }
}
