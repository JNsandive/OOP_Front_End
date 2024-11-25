import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vendor',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css'], // Ensure correct spelling
})
export class EditVendorComponent implements OnInit {
  vendorForm!: FormGroup;
  isLoading = true;
  isModalVisible = false;
  private apiUrl = 'http://localhost:8080/api/v1/vendors/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const vendorId = this.getId();
    this.initializeForm();
    this.fetchVendorDetails(vendorId);
  }

  initializeForm(): void {
    this.vendorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      companyId: ['', Validators.required],
      NIC: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
    });
  }

  fetchVendorDetails(vendorId: number | null): void {
    this.http.get<any>(`${this.apiUrl}${vendorId}`).subscribe({
      next: (response) => {
        this.vendorForm.patchValue(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching vendor details:', error);
        alert('Error fetching vendor details.');
        this.isLoading = false;
        this.router.navigate(['/vendor-dashboard']);
      },
    });
  }

  openModal(): void {
    if (this.vendorForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  submitForm(): void {
    if (this.vendorForm.invalid) {
      alert('Please correct errors before submitting.');
      return;
    }

    const vendorId = this.getId();
    this.http.put(`${this.apiUrl}${vendorId}`, this.vendorForm.value).subscribe({
      next: () => {
        alert('Vendor details updated successfully.');
        location.reload();
      },
      error: (error) => {
        console.error('Error updating vendor details:', error);
        alert('Error updating vendor details.');
      },
    });
  }
  private getId(): number | null {
    const token = localStorage.getItem('jwtToken'); // JWT token stored in localStorage
    if (!token) {
      console.error('No token found in localStorage');
      alert('Error: Authentication token not found');
      return null;
    }

    try {
      const payloadBase64 = token.split('.')[1]; // Extract the payload part of the JWT
      const decodedPayload = atob(payloadBase64); // Decode the Base64 string
      const payload = JSON.parse(decodedPayload); // Parse the JSON payload

      return payload.userId; // Extract the userId claim
    } catch (error) {
      console.error('Error decoding token:', error);
      alert('Error: Unable to decode authentication token');
      return null;
    }
  }
}
