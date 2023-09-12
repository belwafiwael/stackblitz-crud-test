import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RequestService } from '../services/request.service';
import { of } from 'rxjs';
import { Request } from '../models/request.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListRequestsComponent } from './list-requests.component';

describe('ListRequestsComponent', () => {
  let component: ListRequestsComponent;
  let fixture: ComponentFixture<ListRequestsComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRequestService: jasmine.SpyObj<RequestService>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRequestService = jasmine.createSpyObj('RequestService', [
      'getRequest',
      'removeRequest',
      'addRequest',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: RequestService, useValue: mockRequestService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ListRequestsComponent);
    component = fixture.componentInstance;
    component.requests$ = of([]);
    mockRequestService.getRequest.and.returnValue(of([]));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog when openDialog is called', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialog.open.and.returnValue(mockDialogRef);
    mockDialogRef.afterClosed.and.returnValue(of({}));

    TestBed.overrideProvider(MatDialog, { useValue: mockDialog });
    fixture.detectChanges();
    component.openDialog();
    fixture.detectChanges();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should load requests on ngOnInit', () => {
    const mockRequests: Request[] = [
      {
        id: '0001',
        nameRequest: "Demande d'autorisation de travaux",
        description: '01Projet de travaux lorem ipsum',
        user: 'Jhon Doe',
        status: 'En cours',
      },
      {
        id: '0002',
        nameRequest: "02Demande d'autorisation de travaux",
        description: '02Projet de travaux lorem ipsum',
        user: 'Jean Dupond',
        status: 'Validé',
      },
      {
        id: '0003',
        nameRequest: "03Demande d'autorisation de travaux",
        description: '03Projet de travaux lorem ipsum',
        user: 'Francois Alain',
        status: 'Rejeté',
      },
    ];

    mockRequestService.getRequest.and.returnValue(of(mockRequests));

    component.ngOnInit();

    expect(component.requests$).toBeTruthy();
    component.requests$.subscribe((requests) => {
      expect(requests).toEqual(mockRequests);
    });
  });

  it('should remove a request when onDeleteRequest is called', async () => {
    const mockRequestId = '123';

    const mockRequests: Request[] = [
      {
        id: '123',
        nameRequest: "Demande d'autorisation de travaux",
        description: '01Projet de travaux lorem ipsum',
        user: 'Jhon Doe',
        status: 'En cours',
      },
      {
        id: '0002',
        nameRequest: "02Demande d'autorisation de travaux",
        description: '02Projet de travaux lorem ipsum',
        user: 'Jean Dupond',
        status: 'Validé',
      },
      {
        id: '0003',
        nameRequest: "03Demande d'autorisation de travaux",
        description: '03Projet de travaux lorem ipsum',
        user: 'Francois Alain',
        status: 'Rejeté',
      },
    ];
    component.requests$ = of(mockRequests);
    mockRequestService.removeRequest.and.returnValue(of());
    await component.onDeleteRequest(mockRequestId);

    component.requests$.subscribe((requests) => {
      expect(requests).toEqual(
        mockRequests.filter((request) => request.id !== mockRequestId)
      );
    });
  });
});
