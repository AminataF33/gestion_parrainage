import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ligne séparée
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-gerer-periode-parrainage',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule ,FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatListModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './gerer-periode-parrainage.component.html',
  styleUrl: './gerer-periode-parrainage.component.css',
  
})
export class GererPeriodeParrainageComponent implements OnInit {
  
  periodeForm: FormGroup;
  ngOnInit(): void {
      
  }
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.periodeForm = this.fb.group({
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      est_active: [false]
    }, { validator: this.dateValidator });
  }

  // Validateur personnalisé pour vérifier que date_fin > date_debut
  dateValidator(group: FormGroup) {
    const debut = group.get('date_debut')?.value;
    const fin = group.get('date_fin')?.value;
    
    if (debut && fin && new Date(debut) >= new Date(fin)) {
      return { dateInvalide: true };
    }
    return null;
  }

  onSubmit() {
    if (this.periodeForm.valid) {
      const formData = {
        ...this.periodeForm.value,
        // Conversion des dates au format ISO
        date_debut: new Date(this.periodeForm.value.date_debut).toISOString(),
        date_fin: new Date(this.periodeForm.value.date_fin).toISOString()
      };

      this.apiService.creerPeriode(formData).subscribe({
        next: () => {
          this.snackBar.open('Période enregistrée avec succès', 'Fermer', {
            duration: 3000
          });
        },
        error: (err) => {
          this.snackBar.open('Erreur: ' + err.message, 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}