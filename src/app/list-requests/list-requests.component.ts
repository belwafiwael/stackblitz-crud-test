import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { RequestService } from '../services/request.service';
import { RequestComponent } from '../components/request/request.component';
import { Request } from '../models/request.model';

@Component({
  standalone: true,
  selector: 'app-list-requests',
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RequestComponent,
    MatListModule,
    MatDialogModule,
  ],
  template: `

  <div fxLayout="column">
    <div fxLayout="row" fxLayoutAlign="space-between start">
      <div fxLayout="column" fxLayoutAlign="start start">
        <h1 class="title-1">Liste des demandes</h1>
        <h2 class="title-2">Gérer les demandes d'autorisation de travaux.</h2>
      </div>
      <button mat-flat-button color="primary" class="btn-add" (click)="openDialog()">
        <mat-icon>add</mat-icon>
        Ajouter
      </button>
    </div>
    <div *ngIf="requests$ | async as requests">
    <ng-container *ngIf="requests.length > 0; else emptyList">
      <mat-list role="list" class="lists-requests">
        <ng-container *ngFor="let request of requests">
          <mat-list-item role="listitem">
            <app-request [request]="request"
              (deleteRequestClicked)="onDeleteRequest($event)"
              (updateRequestClicked)="onUpdateRequest($event)"
            ></app-request>
          </mat-list-item>
        </ng-container>
      </mat-list>
    </ng-container>
    <ng-template #emptyList>
      <div class="empty-liste">La liste est vide</div>
    </ng-template>
  </div>
</div>

  `,
  styles: [
    `
    .lists-requests{
      margin-top:40px;
      .mat-mdc-list-item{
        margin-bottom:20px;
        height:inherit;
        padding:0
      }
    }
    .empty-liste{
      display:flex;
      padding:30px 0;
      text-align:center;
      justify-content:center;
      font-size:20px
    }
  `,
  ],
})
export class ListRequestsComponent implements OnInit {
  requests$!: Observable<Request[]>;
  private requestUpdateSubject = new Subject<Request>();
  private requestDeleteSubject = new Subject<string>();

  constructor(
    public dialog: MatDialog,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.subscribeToUpdateRequests();
    this.subscribeToDeleteRequests();
  }

  private loadRequests(): void {
    this.requests$ = this.requestService.getRequest();
  }
  onUpdateRequest(request: Request) {
    const requestCopy = { ...request };
    const dialogRef = this.dialog.open(ModalComponent, {
      data: requestCopy,
    });

    dialogRef.afterClosed().subscribe((updatedRequestData) => {
      if (updatedRequestData) {
        this.requestService
          .updateRequest(request.id, updatedRequestData)
          .subscribe(() => {
            this.requestUpdateSubject.next(updatedRequestData);
          });
      }
    });
  }
  onDeleteRequest(requestId: string) {
    this.requestService.removeRequest(requestId).subscribe(() => {
      this.requestDeleteSubject.next(requestId);
    });
  }
  private subscribeToUpdateRequests() {
    this.requestUpdateSubject.subscribe((updatedRequestData) => {
      this.refreshRequests(updatedRequestData);
    });
  }

  private subscribeToDeleteRequests() {
    this.requestDeleteSubject.subscribe((deletedRequest) => {
      this.refreshRequests(deletedRequest);
    });
  }
  private refreshRequests(event?: string | Request) {
    this.requests$ = this.requests$.pipe(
      switchMap((requests) => {
        if (typeof event === 'string') {
          requests = requests.filter((request) => request.id !== event);
        } else if (event instanceof Request) {
          const index = requests.findIndex(
            (request) => request.id === event.id
          );
          if (index !== -1) {
            requests[index] = event;
          }
        }
        return of([...requests]);
      })
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.requestService.addRequest(data).subscribe(() => {
          this.loadRequests();
        });
      }
    });
  }
}
