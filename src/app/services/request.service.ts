import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/request.model';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private apiUrl = 'http://localhost:3000/requests';
  constructor(private http: HttpClient) {}

  getRequest(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  removeRequest(id: string): Observable<Request> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Request>(url);
  }

  addRequest(data: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, data);
  }
  updateRequest(id: string, updatedData: Request): Observable<Request> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Request>(url, updatedData);
  }
}
