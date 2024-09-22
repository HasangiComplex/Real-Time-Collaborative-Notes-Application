import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent {
  constructor(public dialogRef: MatDialogRef<DeleteCardComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Passes data to the parent if needed
  }
}
