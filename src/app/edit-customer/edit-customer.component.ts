import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCard} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    NavbarComponent,
    MatError,
    MatLabel,
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    HttpClientModule,
    NgIf,
    MatInput,
    MatButton
  ],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  apiUrlBase = 'http://localhost:8080/api/v1/consumers'; // Base API URL
  isLoading = true;
  headers: HttpHeaders; // Declare headers

  isDropdownOpen = false;

  isModalVisible: boolean = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  toggleDropdown(isOpen: boolean): void {
    this.isDropdownOpen = isOpen;
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize headers in the constructor
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    });
  }

  ngOnInit(): void {
    // Initialize the form
    this.customerForm = this.fb.group({
      id: [this.getUserId()],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      type: ['', Validators.required],
      NIC: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      customerType: ['', Validators.required],
    });

    const userId = this.getUserId();

    if (!userId) {
      console.error('Error: User ID not found');
      alert('Authentication error: Unable to fetch user ID');
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    });
    // Fetch customer details and populate the form
    const apiUrl = `${this.apiUrlBase}/${userId}`; // Construct the URL with path parameter

    console.log(apiUrl);

    this.http.get<any>(apiUrl,{headers}).subscribe({
      next: (response) => {
        this.customerForm.patchValue(response); // Populate the form with API data
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
        alert('Failed to fetch customer details. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  submitForm() {
    if (this.customerForm.valid) {

      const formData = {
        id: this.customerForm.get('id')?.value,
        firstName: this.customerForm.get('firstName')?.value,
        lastName: this.customerForm.get('lastName')?.value,
        email: this.customerForm.get('email')?.value,
        phoneNumber: this.customerForm.get('phoneNumber')?.value,
        type: this.customerForm.get('customerType')?.value,
        NIC: this.customerForm.get('NIC')?.value,
      }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      });

      const userId = this.getUserId();

      if (!userId) {
        console.error('Error: User ID not found');
        alert('Authentication error: Unable to fetch user ID');
        return;
      }


      const apiUrl = `${this.apiUrlBase}/${userId}`; //

      this.http.put(apiUrl, formData, {headers}).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating customer details:', error);
          alert('Error updating customer details.');
        }
      });
    } else {
      alert('Please fill out the form correctly before submitting.');
    }
  }


  private getUserId(): number | null {
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
