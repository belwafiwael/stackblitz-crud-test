import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
  <mat-card *ngIf="request" class="card-request"  fxLayout="row" fxLayoutAlign="space-between start">
  <mat-card-content  fxLayout="row" fxLayoutGap="1rem" fxLayoutAlign="start start" fxflex="95%">
    <div class="card-img-request" fxFlex="50px">
      <mat-icon> list_alt</mat-icon>
    </div>
    <div fxFlex="auto">
      <mat-card-title>{{request.nameRequest}}</mat-card-title>
      <mat-card-subtitle>{{request.description}}</mat-card-subtitle>
      <p>
        <mat-chip class="chip-name">{{request.user}}</mat-chip>
        <mat-chip class="chip-contrat">Contrat {{request.id}}</mat-chip>
      </p>
    </div>
    <div class="card-status" fxFlex="90px">
      <mat-chip class="status" [ngClass]="getStatusClass(request.status)"
      >{{request.status}}</mat-chip>
    </div>
  </mat-card-content>
  <mat-card-actions fxFlex="5%">
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="voir plus">
      <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="onUpdateClick(request)"><mat-icon>edit</mat-icon><span>Modifier</span> </button>
      <button mat-menu-item  (click)="onDeleteClick(request.id)"><mat-icon>delete_forever</mat-icon><span>Supprimer</span></button>
    </mat-menu>
  </mat-card-actions>
</mat-card>`,
})
export class RequestComponent {
  @Input() request: any;
  @Output() deleteRequestClicked = new EventEmitter<string>();
  @Output() updateRequestClicked = new EventEmitter<Request>();

  onDeleteClick(id: string): void {
    this.deleteRequestClicked.emit(id);
  }
  onUpdateClick(request: Request): void {
    this.updateRequestClicked.emit(request);
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'En cours':
        return 'status-encours';
      case 'Validé':
        return 'status-valide';
      case 'Rejeté':
        return 'status-reject';
      default:
        return '';
    }
  }
}
