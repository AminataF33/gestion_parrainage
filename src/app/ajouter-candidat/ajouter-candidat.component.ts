import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatService } from '../shared/services/candidat.service';


@Component({
  selector: 'app-ajouter-candidat',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ajouter-candidat.component.html',
  styleUrl: './ajouter-candidat.component.css'
})
export class AjouterCandidatComponent {
  voterCardNumber: string = '';
  candidateFound: boolean = false;
  verificationMessage: string = '';
  verificationStatus: string = '';
  submissionMessage: string = '';
  submissionStatus: string = '';
  candidateForm: FormGroup;
  basicInfo: any = {};

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService
  ) {
    this.candidateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{8,15}$/)]],
      partiPolitique: ['', Validators.required],
      slogan: ['', Validators.required],
      color1: ['#000000', Validators.required],
      color2: ['#000000', Validators.required],
      color3: ['#000000', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    });
  }

  verifyVoterCard() {
    this.candidatService.verifyVoterCard(this.voterCardNumber).subscribe({
      next: (response) => {
        if (!response.exists) {
          this.verificationMessage = "Le candidat considéré n'est pas présent dans le fichier électoral";
          this.verificationStatus = 'error';
          this.candidateFound = false;
        } else if (response.isRegistered) {
          this.verificationMessage = "Candidat déjà enregistré !";
          this.verificationStatus = 'error';
          this.candidateFound = false;
        } else {
          this.verificationMessage = "Candidat trouvé. Veuillez compléter les informations.";
          this.verificationStatus = 'success';
          this.candidateFound = true;
          this.basicInfo = response.candidate;
        }
      },
      error: () => {
        this.verificationMessage = "Erreur lors de la vérification. Veuillez réessayer.";
        this.verificationStatus = 'error';
        this.candidateFound = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Ici, vous pouvez ajouter la logique pour valider et traiter l'image
      console.log('Photo sélectionnée:', file.name);
    }
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const formData = {
        ...this.candidateForm.value,
        voterCardNumber: this.voterCardNumber,
        basicInfo: this.basicInfo
      };

      this.candidatService.registerCandidate(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.submissionMessage = "Candidature enregistrée avec succès !";
            this.submissionStatus = 'success';
          } else {
            this.submissionMessage = "Erreur lors de l'enregistrement. Veuillez réessayer.";
            this.submissionStatus = 'error';
          }
        },
        error: () => {
          this.submissionMessage = "Erreur lors de l'enregistrement. Veuillez réessayer.";
          this.submissionStatus = 'error';
        }
      });
    }
  }
}
