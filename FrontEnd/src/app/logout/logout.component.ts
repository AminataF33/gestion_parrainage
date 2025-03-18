import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private dialogRef: MatDialogRef<LogoutComponent>) {}

  onCancel() {
    this.dialogRef.close(false); // L'utilisateur annule la déconnexion
  }

  onConfirm() {
    this.dialogRef.close(true); // L'utilisateur confirme la déconnexion
  }
  
}
