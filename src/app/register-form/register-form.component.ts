import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms'; // Import ReactiveFormsModule
import {HttpClientModule, HttpClient, HttpResponse} from '@angular/common/http'; // Import HttpClientModule
import {Router} from '@angular/router'; // Import Router
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,MatTabsModule], // Add ReactiveFormsModule and HttpClientModule
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerFormConsumer: FormGroup;
  registerFormVendor: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, // Inject Router
  ) {
    this.registerFormConsumer = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customerType: ['', Validators.required],
      nic: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.registerFormVendor = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      companyId: ['', [Validators.required, Validators.pattern(/^CG\d+$/)]], // Updated pattern for validation
      nic: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]

    });

  }


  passwordsMatch(): boolean {
    const password = this.registerFormConsumer.get('password')?.value;
    const confirmPassword = this.registerFormConsumer.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  passwordsMatchVendor(): boolean {
    const password = this.registerFormVendor.get('password')?.value;
    const confirmPassword = this.registerFormVendor.get('confirmPassword')?.value;
    return password === confirmPassword;
  }


  onSubmit(): void {
    if (this.registerFormConsumer.valid && this.passwordsMatch()) {
      const formData = {
        firstName: this.capitalizeFirstLetter(this.registerFormConsumer.get('firstName')?.value || ''),
        lastName: this.capitalizeFirstLetter(this.registerFormConsumer.get('lastName')?.value || ''),
        email: (this.registerFormConsumer.get('email')?.value || ''), // Ensure email is always a string
        phoneNumber: this.registerFormConsumer.get('phoneNumber')?.value || '',
        type: (this.registerFormConsumer.get('customerType')?.value || '').toUpperCase(), // Ensure customerType is always a string
        password: this.registerFormConsumer.get('password')?.value || '',
        NIC: (this.registerFormConsumer.get('nic')?.value || '') // Ensure NIC is always a string
      };

      const registrationUrlConsumer = 'http://localhost:8080/api/v1/consumers/create';

      this.http.post(registrationUrlConsumer, formData).subscribe({
        next: () => {
          alert('Consumer registration successful');
          this.authenticateUser(formData.email, formData.password);
        },
        error: (error) => {
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      alert('Please ensure all fields are filled out correctly and passwords match.');
    }
  }


  onVendorSubmit(): void {
    if (this.registerFormVendor.valid && this.passwordsMatchVendor()) {
      const formData = {
        firstName: this.capitalizeFirstLetter(this.registerFormVendor.get('firstName')?.value || ''),
        lastName: this.capitalizeFirstLetter(this.registerFormVendor.get('lastName')?.value || ''),
        email: this.registerFormVendor.get('email')?.value || '',
        phoneNumber: this.registerFormVendor.get('phoneNumber')?.value || '',
        companyId: this.registerFormVendor.get('companyId')?.value || '',
        NIC: this.registerFormVendor.get('nic')?.value || '',
        password: this.registerFormVendor.get('password')?.value || ''
      };

      const registrationUrlVendor = 'http://localhost:8080/api/v1/vendors/create';

      this.http.post(registrationUrlVendor, formData).subscribe({
        next: () => {
          alert('Vendor registration successful');
          this.authenticateUser(formData.email, formData.password);
        },
        error: (error) => {
          alert('Vendor registration failed. Please try again.');
        }
      });
    } else {
      alert('Please ensure all fields are filled out correctly and passwords match.');
    }
  }

  authenticateUser(email: string, password: string): void {
    const authUrl = 'http://localhost:8080/api/v1/auth/login';
    const authData = { email, password };

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
        alert('Authentication failed. Please try logging in manually.');
      }
    });
  }

  capitalizeFirstLetter(value: string): string {
    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }
}
