import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-upload-electeurs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: `./importer-liste.component.html`,
  styleUrl: './importer-liste.component.css'
})
export class ImporterListeComponent  {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  uploadStatus: { success: boolean; message: string; validable?: boolean } | null = null;
  csvErrors: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.uploadForm = this.fb.group({
      checksum: ['', Validators.required]
    });
  }

  // Méthode pour gérer le changement de fichier
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith('.csv')) {
        this.fileError = 'Veuillez sélectionner un fichier CSV valide.';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.fileError = null;

      // Calcul du checksum SHA-256
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        const hash = CryptoJS.SHA256(fileContent).toString();
        this.uploadForm.patchValue({ checksum: hash });
      };
      reader.readAsText(file);
    }
  }

  // Méthode pour soumettre le fichier et le checksum au backend
  onSubmit() {
    if (!this.selectedFile) {
      this.fileError = 'Aucun fichier sélectionné.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('checksum', this.uploadForm.value.checksum);
    formData.append('userName', 'anne'); // Remplace par les vraies valeurs
    formData.append('userPrenom', 'kende');
    formData.append('userIp', '192.168.1.97'); // Récupérer dynamiquement si possible

    this.apiService.importElecteurs(formData).subscribe({
      next: (response) => {
        this.uploadStatus = { success: true, message: response.message, validable: response.validable };
        this.csvErrors = [];
      },
      error: (error: HttpErrorResponse) => {
        this.uploadStatus = { success: false, message: error.error.message };
        this.csvErrors = error.error.errors || [];
      }
    });
  }

  // Méthode pour valider l'importation
  validerImportation() {
    if (!this.uploadStatus?.validable) return;

    this.apiService.validerImportation().subscribe({
      next: (response) => {
        this.uploadStatus = { success: true, message: 'Importation validée avec succès !' };
      },
      error: (error: HttpErrorResponse) => {
        this.uploadStatus = { success: false, message: 'Erreur lors de la validation de l’importation.' };
      }
    });
  }
}
