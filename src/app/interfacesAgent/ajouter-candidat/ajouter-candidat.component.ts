import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ajouter-candidat',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.css']
})
export class AjouterCandidatComponent {
  candidatForm: FormGroup;
  messageErreur: string = '';
  messageSucces: string = '';  // Variable pour le message de succès
  verificationEnCours: boolean = false;
  electeurTrouve: boolean = false;
  electeurNomPrenom: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.candidatForm = this.fb.group({
      numero_electeur: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      parti_politique: ['', Validators.required],
      slogan: ['', Validators.required],
      site_web: ['', Validators.required],
    });
  }

  // ✅ Vérifier si l'électeur existe
  verifierElecteur() {
    const numeroElecteur = this.candidatForm.get('numero_electeur')?.value;
    if (!numeroElecteur) return;

    this.verificationEnCours = true;
    this.apiService.verifierElecteur(numeroElecteur).subscribe(
      (response) => {
        this.electeurTrouve = response.exists;
        this.electeurNomPrenom = response.exists ? `${response.nom} ${response.prenom}` : '';
        this.messageErreur = response.exists ? '' : 'Aucun électeur trouvé avec ce numéro.';
        this.verificationEnCours = false;
      },
      () => {
        this.electeurTrouve = false;
        this.messageErreur = 'Erreur lors de la vérification de l’électeur.';
        this.verificationEnCours = false;
      }
    );
  }

  // ✅ Ajouter un candidat
  ajouterCandidat() {
    console.log("Données brutes du formulaire :", this.candidatForm.value);

    if (!this.electeurTrouve) {
      this.messageErreur = "Impossible d'ajouter un candidat sans vérification.";
      return;
    }

    const data = {
      electeur: this.candidatForm.get('numero_electeur')?.value, 
      email: this.candidatForm.get('email')?.value,
      telephone: this.candidatForm.get('telephone')?.value,
      parti_politique: this.candidatForm.get('parti_politique')?.value,
      slogan: this.candidatForm.get('slogan')?.value,
      site_web: this.candidatForm.get('site_web')?.value,
    };

    console.log("Données envoyées au backend :", data); // Debug avant envoi

    this.apiService.ajouterCandidat(data).subscribe(
      (response) => {
        console.log("Réponse du serveur :", response);
        this.messageSucces = 'Candidat ajouté avec succès !';  // Affichage du message de succès
        this.candidatForm.reset();
        this.electeurTrouve = false;
        this.electeurNomPrenom = '';
        setTimeout(() => { this.messageSucces = ''; }, 5000);  // Réinitialiser après 5 secondes
      },
      (error) => {
        console.error("Erreur lors de l'ajout :", error);
        this.messageErreur = error.error.message || 'Erreur lors de l’ajout du candidat.';
      }
    );
  }
}




/*
export class AjouterCandidatComponent {
  candidatForm: FormGroup;
  messageErreur: string = '';
  verificationEnCours: boolean = false;
  electeurTrouve: boolean = false;
  electeurNomPrenom: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.candidatForm = this.fb.group({
      numero_electeur: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      parti_politique: ['', Validators.required],
      slogan: ['', Validators.required],
      site_web: ['', Validators.required],
    });
  }

  // ✅ Vérifier si l'électeur existe
  verifierElecteur() {
    const numeroElecteur = this.candidatForm.get('numero_electeur')?.value;
    if (!numeroElecteur) return;

    this.verificationEnCours = true;
    this.apiService.verifierElecteur(numeroElecteur).subscribe(
      (response) => {
        this.electeurTrouve = response.exists;
        this.electeurNomPrenom = response.exists ? `${response.nom} ${response.prenom}` : '';
        this.messageErreur = response.exists ? '' : 'Aucun électeur trouvé avec ce numéro.';
        this.verificationEnCours = false;
      },
      () => {
        this.electeurTrouve = false;
        this.messageErreur = 'Erreur lors de la vérification de l’électeur.';
        this.verificationEnCours = false;
      }
    );
  }

  // ✅ Ajouter un candidat
  ajouterCandidat() {
    console.log("Données brutes du formulaire :", this.candidatForm.value);

    if (!this.electeurTrouve) {
      this.messageErreur = "Impossible d'ajouter un candidat sans vérification.";
      return;
    }

    const data = {
      electeur: this.candidatForm.get('numero_electeur')?.value, 
      email: this.candidatForm.get('email')?.value,
      telephone: this.candidatForm.get('telephone')?.value,
      parti_politique: this.candidatForm.get('parti_politique')?.value,
      slogan: this.candidatForm.get('slogan')?.value,
      site_web: this.candidatForm.get('site_web')?.value,
    };

    console.log("Données envoyées au backend :", data); //  Debug avant envoi

    this.apiService.ajouterCandidat(data).subscribe(
      (response) => {
        console.log("Réponse du serveur :", response);
        alert('Candidat ajouté avec succès !');
        this.candidatForm.reset();
        this.electeurTrouve = false;
        this.electeurNomPrenom = '';
      },
      (error) => {
        console.error("Erreur lors de l'ajout :", error);
        this.messageErreur = error.error.message || 'Erreur lors de l’ajout du candidat.';
      }
    );
  }
}


*/
