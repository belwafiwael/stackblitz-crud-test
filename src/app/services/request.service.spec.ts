import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RequestService } from './request.service';

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

  it('should fetch requests from the API via GET', () => {
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

    service.getRequest().subscribe((requests) => {
      expect(requests).toEqual(mockRequests);
    });

    const request = httpMock.expectOne('http://localhost:3000/requests');
    expect(request.request.method).toBe('GET');
    request.flush(mockRequests);
  });

  it('should delete a request via DELETE', () => {
    const requestId = '123'; // Replace with a valid ID
    service.removeRequest(requestId).subscribe();

    const request = httpMock.expectOne(
      `http://localhost:3000/requests/${requestId}`
    );
    expect(request.request.method).toBe('DELETE');
  });

  it('should add a request via POST', () => {
    const mockRequest = {
      id: '00010',
      nameRequest: "Demande d'autorisation de travaux",
      description: 'Test Projet de travaux lorem ipsum',
      user: 'Jhon Doe test',
      status: 'En cours',
    };

    service.addRequest(mockRequest).subscribe((newRequest) => {
      expect(newRequest).toEqual(mockRequest);
    });

    const request = httpMock.expectOne('http://localhost:3000/requests');
    expect(request.request.method).toBe('POST');
    request.flush(mockRequest);
  });
});
