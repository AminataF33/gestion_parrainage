import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-importer-liste',
  imports: [FormsModule, CommonModule],
  templateUrl: './importer-liste.component.html',
  styleUrl: './importer-liste.component.css'
})
export class ImporterListeComponent {
  selectedFile: File | null = null;
  userChecksum: string = '';
  isFileSelected: boolean = false;
  message: string = '';
  messageClass: string = '';
  

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.isFileSelected = true;
      this.message = '';
    }
  }

  async onUpload() {
    if (!this.selectedFile || !this.userChecksum) {
      this.message = 'Veuillez sélectionner un fichier et entrer le checksum';
      this.messageClass = 'error';
      return;
    }

    try {
      // Simulation de la validation du checksum
      // Dans un cas réel, vous devriez calculer le checksum du fichier
      const isChecksumValid = true; // À remplacer par la vraie validation

      if (isChecksumValid) {
        // Simulation de l'envoi à la base de données
        this.message = 'Fichier validé et prêt pour l\'envoi à la base de données';
        this.messageClass = 'success';
      } else {
        this.message = 'Le checksum ne correspond pas';
        this.messageClass = 'error';
      }
    } catch (error) {
      this.message = 'Une erreur est survenue lors du traitement du fichier';
      this.messageClass = 'error';
      console.error('Erreur:', error);
    }
  }
}
