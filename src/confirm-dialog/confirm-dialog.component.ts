import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  imports: [CommonModule, MatDialogModule],

})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}
  get title() { return this.data.title; }
  get message() { return this.data.message; }
}
