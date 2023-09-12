import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { of } from 'rxjs';
import { ListRequestsComponent } from './list-requests.component';
import { RequestService } from '../services/request.service';

describe('ListRequestsComponent', () => {
  let component: ListRequestsComponent;
  let fixture: ComponentFixture<ListRequestsComponent>;
  let mockRequestService: jasmine.SpyObj<RequestService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockRequestService = jasmine.createSpyObj('RequestService', [
      'getRequest',
      'removeRequest',
      'addRequest',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);

    TestBed.configureTestingModule({
      declarations: [ListRequestsComponent],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        FlexLayoutModule,
      ],
      providers: [
        { provide: RequestService, useValue: mockRequestService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    });

    fixture = TestBed.createComponent(ListRequestsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load requests on initialization', () => {
    const mockRequests = [
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

    fixture.detectChanges();

    expect(component.requests$).toBeDefined();
    expect(component.requests$).toEqual(of(mockRequests));
  });

  it('should handle request deletion', () => {
    const mockRequests = [
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
    mockMatDialog.afterAllClosed.and.returnValue(of({}));

    fixture.detectChanges();

    component.onDeleteRequest('1');

    expect(mockRequestService.removeRequest).toHaveBeenCalledWith('1');
    expect(component.requests$).toEqual(of([]));
  });

  it('should open dialog on addRequest', () => {
    mockMatDialog.open.and.returnValue({ afterClosed: () => of({}) });

    fixture.detectChanges();

    component.openDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function));
  });
});
