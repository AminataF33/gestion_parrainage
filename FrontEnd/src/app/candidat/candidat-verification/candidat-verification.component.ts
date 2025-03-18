import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParrainageService } from '../../shared/services/parrainage.service';

@Component({
  selector: 'app-candidat-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `candidat-verification.component.html`,
  providers: [ParrainageService]
})
export class CandidatVerificationComponent {
  verificationCode: string = '';
  loading: boolean = false;
  verificationResult: any = null;
  verificationError: string = '';

  constructor(private parrainageService: ParrainageService) {}

  verifyParrainage(): void {
    this.loading = true;
    this.verificationResult = null;
    this.verificationError = '';
    
    this.parrainageService.verifyParrainage(this.verificationCode)
      .subscribe({
        next: (result) => {
          this.verificationResult = result;
          this.loading = false;
        },
        error: (error) => {
          this.verificationError = 'Une erreur est survenue lors de la vérification. Veuillez réessayer.';
          this.loading = false;
          console.error('Verification error:', error);
        }
      });
  }
}