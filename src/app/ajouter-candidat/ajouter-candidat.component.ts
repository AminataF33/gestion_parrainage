import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter-candidat',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.css']
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

  constructor(private fb: FormBuilder) {
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

  // Simuler la vérification de la carte d'électeur
  verifyVoterCard() {
    // Simuler la réponse d'une base de données (ici c'est une simulation)
    if (this.voterCardNumber === '123456') {
      this.verificationMessage = "Candidat trouvé. Veuillez compléter les informations.";
      this.verificationStatus = 'success';
      this.candidateFound = true;
      // Simuler des informations de base pour le candidat
      this.basicInfo = {
        nom: 'Jean',
        prenom: 'Dupont',
        dateNaissance: '01/01/1990'
      };
    } else {
      this.verificationMessage = "Le candidat n'existe pas dans le fichier électoral.";
      this.verificationStatus = 'error';
      this.candidateFound = false;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Photo sélectionnée:', file.name);
    }
  }

  // Simuler la soumission du formulaire
  onSubmit() {
    if (this.candidateForm.valid) {
      const formData = {
        ...this.candidateForm.value,
        voterCardNumber: this.voterCardNumber,
        basicInfo: this.basicInfo
      };

      // Simuler l'enregistrement du candidat
      console.log('Données soumises:', formData);

      // Simulation de succès
      this.submissionMessage = "Candidature enregistrée avec succès !";
      this.submissionStatus = 'success';
    } else {
      this.submissionMessage = "Veuillez vérifier les informations avant de soumettre.";
      this.submissionStatus = 'error';
    }
  }
}
