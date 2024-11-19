import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/v1/auth/login'; // Replace with your authentication URL

  constructor(private http: HttpClient, private router: Router) {}

  authenticateUser(email: string, password: string): Observable<any> {
    const authData = { email, password };
    return this.http.post<{ token: string, role: string, companyId?: string }>(this.authUrl, authData);
  }

  handleAuthentication(response: { token: string, role: string, companyId?: string }): void {
    localStorage.setItem('jwtToken', response.token);
    localStorage.setItem('userRole', response.role);
    if (response.companyId) {
      localStorage.setItem('companyId', response.companyId);
    }

    // Redirect based on role
    if (response.role === 'CONSUMER') {
      this.router.navigate(['/customer-dashboard']);
    } else if (response.role === 'VENDOR') {
      this.router.navigate(['/vendor-dashboard']);
    } else {
      alert('Unknown user role');
    }
  }
}
