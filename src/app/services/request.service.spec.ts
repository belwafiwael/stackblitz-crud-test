import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RequestService } from './request.service';
import { Request } from '../models/request.model';

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestService],
    });

    service = TestBed.inject(RequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get requests', () => {
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

    service.getRequest().subscribe((requests) => {
      expect(requests).toEqual(mockRequests);
    });

    const req = httpMock.expectOne('http://localhost:4200/requests');
    expect(req.request.method).toBe('GET');
    req.flush(mockRequests);
  });

  it('should remove a request by ID', () => {
    const requestId = '123';

    service.removeRequest(requestId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `http://localhost:4200/requests/${requestId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add a new request', () => {
    const mockRequest: Request = {
      id: '0001',
      nameRequest: "Demande d'autorisation de travaux",
      description: '01Projet de travaux lorem ipsum',
      user: 'Jhon Doe',
      status: 'En cours',
    };

    service.addRequest(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockRequest);
    });

    const req = httpMock.expectOne('http://localhost:4200/requests');
    expect(req.request.method).toBe('POST');
    req.flush(mockRequest);
  });
});
