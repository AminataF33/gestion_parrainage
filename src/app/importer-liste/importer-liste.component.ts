import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-upload-electeurs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: `importer-liste.component.html`,
  styles: []
})
export class ImporterListeComponent  {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  uploadStatus: { success: boolean, message: string, validable?: boolean } | null = null;
  csvErrors: string[] = [];

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      checksum: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      if (!file.name.endsWith('.csv')) {
        this.fileError = 'Le fichier doit être au format CSV.';
        return;
      }

      this.selectedFile = file;
      this.fileError = null;
    }
  }

  async onSubmit() {
    if (this.uploadForm.invalid || !this.selectedFile) {
      return;
    }

    const checksumValue = this.uploadForm.get('checksum')?.value;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target?.result as string;
      
      // Calcul du checksum SHA256
      const calculatedChecksum = CryptoJS.SHA256(fileContent).toString();

      if (calculatedChecksum !== checksumValue) {
        this.uploadStatus = {
          success: false,
          message: 'L\'empreinte CHECKSUM ne correspond pas au contenu du fichier.'
        };
        return;
      }

      // Vérification du format CSV et contrôle des données
      const isUtf8 = this.isUtf8(fileContent);
      if (!isUtf8) {
        this.uploadStatus = {
          success: false,
          message: 'Le fichier n\'est pas encodé en UTF-8.'
        };
        return;
      }

      // Contrôle du contenu CSV
      const errors = this.validateCsv(fileContent);
      if (errors.length > 0) {
        this.csvErrors = errors;
        this.uploadStatus = {
          success: false,
          message: 'Le fichier contient des erreurs, veuillez les corriger.'
        };
        return;
      }

      this.uploadStatus = {
        success: true,
        message: 'Fichier validé et prêt pour l\'envoi en base.',
        validable: true
      };
    };

    reader.readAsText(this.selectedFile);
  }

  validerImportation() {
    // Simuler l'appel à la procédure PL/SQL
    this.uploadStatus = {
      success: true,
      message: 'L\'importation a été validée avec succès. Les données ont été transférées vers la table persistante.'
    };
  }

  // Vérification simple de l'encodage UTF-8
  private isUtf8(content: string): boolean {
    return true; // À remplacer par une vraie validation si nécessaire
  }

  // Contrôle des données du fichier CSV
  private validateCsv(content: string): string[] {
    const errors: string[] = [];
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);

    if (lines.length < 2) {
      errors.push('Le fichier doit contenir un en-tête et au moins une ligne de données.');
      return errors;
    }

    // Vérification de l'en-tête
    const headers = lines[0].split(';').map(h => h.trim());
    const expectedHeaders = ['NumeroCIN', 'NumeroElecteur', 'Nom', 'Prenom', 'DateNaissance', 'LieuNaissance', 'Sexe'];

    if (!this.compareHeaders(headers, expectedHeaders)) {
      errors.push('Les colonnes du fichier ne sont pas conformes.');
      return errors;
    }

    // Vérification des lignes de données
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(';').map(c => c.trim());

      if (columns.length !== expectedHeaders.length) {
        errors.push(`Ligne ${i + 1}: Nombre de colonnes incorrect.`);
        continue;
      }

      // Vérification des valeurs
      if (!/^\d{13}$/.test(columns[0])) errors.push(`Ligne ${i + 1}: Numéro CIN invalide.`);
      if (!/^\d{10}$/.test(columns[1])) errors.push(`Ligne ${i + 1}: Numéro électeur invalide.`);
      if (!/^[A-Z]+$/.test(columns[2])) errors.push(`Ligne ${i + 1}: Nom invalide.`);
      if (!/^[A-Z]+$/.test(columns[3])) errors.push(`Ligne ${i + 1}: Prénom invalide.`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(columns[4])) errors.push(`Ligne ${i + 1}: Date de naissance invalide.`);
      if (!/^[A-Z\s]+$/.test(columns[5])) errors.push(`Ligne ${i + 1}: Lieu de naissance invalide.`);
      if (!/^(M|F)$/.test(columns[6])) errors.push(`Ligne ${i + 1}: Sexe invalide.`);
    }

    return errors;
  }

  private compareHeaders(headers: string[], expectedHeaders: string[]): boolean {
    return JSON.stringify(headers) === JSON.stringify(expectedHeaders);
  }
}
