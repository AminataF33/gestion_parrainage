import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-gerer-periode-parrainage',
  imports: [FormsModule, CommonModule],
  templateUrl: './gerer-periode-parrainage.component.html',
  styleUrl: './gerer-periode-parrainage.component.css'
})
export class GererPeriodeParrainageComponent {
  startDate: string = '';
  endDate: string = '';
  isValid: boolean = false;
  message: string = '';
  messageClass: string = '';

  validateDates() {
    if (!this.startDate || !this.endDate) {
      this.isValid = false;
      this.message = 'Veuillez sélectionner les deux dates';
      this.messageClass = 'error';
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (end <= start) {
      this.isValid = false;
      this.message = 'La date de fermeture doit être postérieure à la date d\'ouverture';
      this.messageClass = 'error';
      return;
    }

    this.isValid = true;
    this.message = 'Les dates sont valides';
    this.messageClass = 'success';
  }

  onSubmit() {
    if (!this.isValid) {
      return;
    }

    // Ici, vous pourrez ajouter la logique pour sauvegarder les dates
    console.log('Dates validées:', {
      dateOuverture: this.startDate,
      dateFermeture: this.endDate
    });
    
    this.message = 'Les dates ont été enregistrées avec succès';
    this.messageClass = 'success';
  }
}
