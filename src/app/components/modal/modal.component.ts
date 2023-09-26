import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  template: `
    <h1 mat-dialog-title>Ajouter une demande d'autorisation</h1>
    <div mat-dialog-content>
      <form [formGroup]="requestForm" novalidate>
      <mat-form-field appearance="outline">
        <mat-label>Projet de travaux</mat-label>
        <input matInput formControlName="nameRequest">
        <mat-error *ngIf="requestForm.get('nameRequest')?.hasError('required')">
          Enter le nom de la demande
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Description</mat-label>
        <input matInput formControlName="description">
        <mat-error *ngIf="requestForm.get('description')?.hasError('required')">
          Enter la description de votre demande
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Utilisateur</mat-label>
        <input matInput formControlName="user">
        <mat-error *ngIf="requestForm.get('description')?.hasError('required')">
          Enter le nom de l'utilisateur
        </mat-error>
      </mat-form-field>
      </form>

    </div>
    <div mat-dialog-actions fxLayout="row" fxLayoutAlign="space-between start">
      <button mat-stroked-button color="primary" class="btn-reset" (click)="onNoClick()">
            Annuler
      </button>
      <button mat-flat-button color="primary" class="btn-add" [disabled]="!requestForm.valid" [mat-dialog-close]="requestForm.value">
            Ajouter
      </button>

    </div>
  `,
  styles: [``],
})
export class ModalComponent {
  requestForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    if (this.data) {
      this.requestForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.requestForm = this.fb.group({
      nameRequest: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      user: ['', [Validators.required, Validators.minLength(4)]],
      id: [Date.now().toString()],
      status: 'En cours',
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
