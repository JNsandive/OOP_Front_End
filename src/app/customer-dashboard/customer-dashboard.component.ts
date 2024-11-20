import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, NgClass} from '@angular/common';
import { CustomerNavbarComponent } from '../customer-navbar/customer-navbar.component'; // Adjust path if necessary
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    CommonModule,
    HttpClientModule,CustomerNavbarComponent

  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  tickets: any[] = [
    ];


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/tickets/list').subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }
  selectedTicketIds: number[] = []; // Array to store selected ticket IDs

  selectTicket(ticket: any): void {
    if (ticket.available) {
      ticket.selected = !ticket.selected; // Toggle the selection state
      if (ticket.selected) {
        // Add to the list if the ticket is selected
        this.selectedTicketIds.push(ticket.id);
      } else {
        // Remove from the list if the ticket is deselected
        this.selectedTicketIds = this.selectedTicketIds.filter(id => id !== ticket.id);
      }
      console.log('Selected Ticket IDs:', this.selectedTicketIds); // Log to see current selection
    }
  }

  buyTickets() {
    // Initialize headers with JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    });

    // Send POST request to buy tickets with selected ticket IDs and JWT
    this.http.post('http://localhost:8080/api/v1/tickets/purchase', this.selectedTicketIds, { headers }).subscribe(
      (response) => {
        console.log('Tickets bought successfully:', response);
        alert('Tickets bought successfully');
        // reload the page
        window.location.reload();
      },
      (error) => {
        console.error('Error buying tickets:', error);
        alert('Error buying tickets');
      }
    );
  }
}

