import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8080/api/v1/consumers/create';

  constructor(private http: HttpClient) {}

  registerCustomer(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, data, { observe: 'response' });
  }
}
