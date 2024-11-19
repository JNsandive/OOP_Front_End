import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClientModule, HttpClient, HttpResponse} from '@angular/common/http'; // Import HttpClientModule
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  ngOnInit() {
    console.log('Form initialized:', this.loginForm);
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const formData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.authenticate(formData.email, formData.password);

  }

  authenticate(email: string, password: string): void {
    const authUrl = 'http://localhost:8080/api/v1/auth/login';
    const authData = {email, password};

    this.http.post<{ token: string, role: string, companyId?: string }>(authUrl, authData).subscribe({
      next: (authResponse) => {
        localStorage.setItem('jwtToken', authResponse.token);
        localStorage.setItem('userRole', authResponse.role);

        if (authResponse.role === 'CONSUMER') {
          this.router.navigate(['/customer-dashboard']);
        } else if (authResponse.role === 'VENDOR') {
          this.router.navigate(['/vendor-dashboard']);
        } else {
          alert('Unknown user role');
        }
      },
      error: () => {
        alert('Authentication failed. Credentials Wrong Please try again .');
      }
    });
  }
}
