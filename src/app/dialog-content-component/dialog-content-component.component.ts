import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.content }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Close</button>
    </mat-dialog-actions>
  `,
})
/**
 * Skeleton for the dialog component written in the MovieCardComponent. This component builds the structure for that dialog popup.
 */
export class DialogContentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
