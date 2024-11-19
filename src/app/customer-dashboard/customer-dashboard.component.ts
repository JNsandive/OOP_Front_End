import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, NgClass} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    CommonModule,
    HttpClientModule

  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  tickets: any[] = [
    { id: 301, name: 'Ticket-301', price: 15.0, updatedAt: null, available: true },
    { id: 302, name: 'Ticket-302', price: 20.0, updatedAt: null, available: false },
    { id: 303, name: 'Ticket-303', price: 18.5, updatedAt: null, available: true },
    { id: 304, name: 'Ticket-304', price: 12.0, updatedAt: null, available: false },
    { id: 305, name: 'Ticket-305', price: 25.0, updatedAt: null, available: true },
    { id: 306, name: 'Ticket-306', price: 22.5, updatedAt: null, available: true },
    { id: 307, name: 'Ticket-307', price: 19.0, updatedAt: null, available: false },
    { id: 308, name: 'Ticket-308', price: 16.0, updatedAt: null, available: true },
    { id: 309, name: 'Ticket-309', price: 27.0, updatedAt: null, available: true },
    { id: 310, name: 'Ticket-310', price: 21.0, updatedAt: null, available: false },
    { id: 311, name: 'Ticket-311', price: 14.5, updatedAt: null, available: true },
    { id: 312, name: 'Ticket-312', price: 30.0, updatedAt: null, available: false },
    { id: 313, name: 'Ticket-313', price: 17.5, updatedAt: null, available: true },
    { id: 314, name: 'Ticket-314', price: 23.0, updatedAt: null, available: false },
    { id: 315, name: 'Ticket-315', price: 28.5, updatedAt: null, available: true },
    { id: 316, name: 'Ticket-316', price: 20.5, updatedAt: null, available: false },
    { id: 317, name: 'Ticket-317', price: 18.0, updatedAt: null, available: true },
    { id: 318, name: 'Ticket-318', price: 22.0, updatedAt: null, available: true },
    { id: 319, name: 'Ticket-319', price: 26.0, updatedAt: null, available: false },
    { id: 320, name: 'Ticket-320', price: 19.5, updatedAt: null, available: true },
    { id: 301, name: 'Ticket-301', price: 15.0, updatedAt: null, available: true },
    { id: 302, name: 'Ticket-302', price: 20.0, updatedAt: null, available: false },
    { id: 303, name: 'Ticket-303', price: 18.5, updatedAt: null, available: true },
    { id: 304, name: 'Ticket-304', price: 12.0, updatedAt: null, available: false },
    { id: 305, name: 'Ticket-305', price: 25.0, updatedAt: null, available: true },
    { id: 306, name: 'Ticket-306', price: 22.5, updatedAt: null, available: true },
    { id: 307, name: 'Ticket-307', price: 19.0, updatedAt: null, available: false },
    { id: 308, name: 'Ticket-308', price: 16.0, updatedAt: null, available: true },
    { id: 309, name: 'Ticket-309', price: 27.0, updatedAt: null, available: true },
    { id: 310, name: 'Ticket-310', price: 21.0, updatedAt: null, available: false },
    { id: 311, name: 'Ticket-311', price: 14.5, updatedAt: null, available: true },
    { id: 312, name: 'Ticket-312', price: 30.0, updatedAt: null, available: false },
    { id: 313, name: 'Ticket-313', price: 17.5, updatedAt: null, available: true },
    { id: 314, name: 'Ticket-314', price: 23.0, updatedAt: null, available: false },
    { id: 315, name: 'Ticket-315', price: 28.5, updatedAt: null, available: true },
    { id: 316, name: 'Ticket-316', price: 20.5, updatedAt: null, available: false },
    { id: 317, name: 'Ticket-317', price: 18.0, updatedAt: null, available: true },
    { id: 318, name: 'Ticket-318', price: 22.0, updatedAt: null, available: true },
    { id: 319, name: 'Ticket-319', price: 26.0, updatedAt: null, available: false },
    { id: 301, name: 'Ticket-301', price: 15.0, updatedAt: null, available: true },
    { id: 302, name: 'Ticket-302', price: 20.0, updatedAt: null, available: false },
    { id: 303, name: 'Ticket-303', price: 18.5, updatedAt: null, available: true },
    { id: 304, name: 'Ticket-304', price: 12.0, updatedAt: null, available: false },
    { id: 305, name: 'Ticket-305', price: 25.0, updatedAt: null, available: true },
    { id: 306, name: 'Ticket-306', price: 22.5, updatedAt: null, available: true },
    { id: 307, name: 'Ticket-307', price: 19.0, updatedAt: null, available: false },
    { id: 308, name: 'Ticket-308', price: 16.0, updatedAt: null, available: true },
    { id: 309, name: 'Ticket-309', price: 27.0, updatedAt: null, available: true },
    { id: 310, name: 'Ticket-310', price: 21.0, updatedAt: null, available: false },
    { id: 311, name: 'Ticket-311', price: 14.5, updatedAt: null, available: true },
    { id: 312, name: 'Ticket-312', price: 30.0, updatedAt: null, available: false },
    { id: 313, name: 'Ticket-313', price: 17.5, updatedAt: null, available: true },
    { id: 314, name: 'Ticket-314', price: 23.0, updatedAt: null, available: false },
    { id: 315, name: 'Ticket-315', price: 28.5, updatedAt: null, available: true },
    { id: 316, name: 'Ticket-316', price: 20.5, updatedAt: null, available: false },
    { id: 317, name: 'Ticket-317', price: 18.0, updatedAt: null, available: true },
    { id: 318, name: 'Ticket-318', price: 22.0, updatedAt: null, available: true },
    { id: 319, name: 'Ticket-319', price: 26.0, updatedAt: null, available: false },
    { id: 301, name: 'Ticket-301', price: 15.0, updatedAt: null, available: true },
    { id: 302, name: 'Ticket-302', price: 20.0, updatedAt: null, available: false },
    { id: 303, name: 'Ticket-303', price: 18.5, updatedAt: null, available: true },
    { id: 304, name: 'Ticket-304', price: 12.0, updatedAt: null, available: false },
    { id: 305, name: 'Ticket-305', price: 25.0, updatedAt: null, available: true },
    { id: 306, name: 'Ticket-306', price: 22.5, updatedAt: null, available: true },
    { id: 307, name: 'Ticket-307', price: 19.0, updatedAt: null, available: false },
    { id: 308, name: 'Ticket-308', price: 16.0, updatedAt: null, available: true },
    { id: 309, name: 'Ticket-309', price: 27.0, updatedAt: null, available: true },
    { id: 310, name: 'Ticket-310', price: 21.0, updatedAt: null, available: false },
    { id: 311, name: 'Ticket-311', price: 14.5, updatedAt: null, available: true },
    { id: 312, name: 'Ticket-312', price: 30.0, updatedAt: null, available: false },
    { id: 313, name: 'Ticket-313', price: 17.5, updatedAt: null, available: true },
    { id: 314, name: 'Ticket-314', price: 23.0, updatedAt: null, available: false },
    { id: 315, name: 'Ticket-315', price: 28.5, updatedAt: null, available: true },
    { id: 316, name: 'Ticket-316', price: 20.5, updatedAt: null, available: false },
    { id: 317, name: 'Ticket-317', price: 18.0, updatedAt: null, available: true },
    { id: 318, name: 'Ticket-318', price: 22.0, updatedAt: null, available: true },
    { id: 319, name: 'Ticket-319', price: 26.0, updatedAt: null, available: false },
    { id: 301, name: 'Ticket-301', price: 15.0, updatedAt: null, available: true },
    { id: 302, name: 'Ticket-302', price: 20.0, updatedAt: null, available: false },
    { id: 303, name: 'Ticket-303', price: 18.5, updatedAt: null, available: true },
    { id: 304, name: 'Ticket-304', price: 12.0, updatedAt: null, available: false },
    { id: 305, name: 'Ticket-305', price: 25.0, updatedAt: null, available: true },
    { id: 306, name: 'Ticket-306', price: 22.5, updatedAt: null, available: true },
    { id: 307, name: 'Ticket-307', price: 19.0, updatedAt: null, available: false },
    { id: 308, name: 'Ticket-308', price: 16.0, updatedAt: null, available: true },
    { id: 309, name: 'Ticket-309', price: 27.0, updatedAt: null, available: true },
    { id: 310, name: 'Ticket-310', price: 21.0, updatedAt: null, available: false },
    { id: 311, name: 'Ticket-311', price: 14.5, updatedAt: null, available: true },
    { id: 312, name: 'Ticket-312', price: 30.0, updatedAt: null, available: false },
    { id: 313, name: 'Ticket-313', price: 17.5, updatedAt: null, available: true },
    { id: 314, name: 'Ticket-314', price: 23.0, updatedAt: null, available: false },
    { id: 315, name: 'Ticket-315', price: 28.5, updatedAt: null, available: true },
    { id: 316, name: 'Ticket-316', price: 20.5, updatedAt: null, available: false },
    { id: 317, name: 'Ticket-317', price: 18.0, updatedAt: null, available: true },
    { id: 318, name: 'Ticket-318', price: 22.0, updatedAt: null, available: true },
    { id: 319, name: 'Ticket-319', price: 26.0, updatedAt: null, available: false },
    { id: 301, name: 'Ticket-301', price: 15.0, updatedAt: null, available: true },
    { id: 302, name: 'Ticket-302', price: 20.0, updatedAt: null, available: false },
    { id: 303, name: 'Ticket-303', price: 18.5, updatedAt: null, available: true },
    { id: 304, name: 'Ticket-304', price: 12.0, updatedAt: null, available: false },
    { id: 305, name: 'Ticket-305', price: 25.0, updatedAt: null, available: true },
    { id: 306, name: 'Ticket-306', price: 22.5, updatedAt: null, available: true },
    { id: 307, name: 'Ticket-307', price: 19.0, updatedAt: null, available: false },
    { id: 308, name: 'Ticket-308', price: 16.0, updatedAt: null, available: true },
    { id: 309, name: 'Ticket-309', price: 27.0, updatedAt: null, available: true },
    { id: 310, name: 'Ticket-310', price: 21.0, updatedAt: null, available: false },
    { id: 311, name: 'Ticket-311', price: 14.5, updatedAt: null, available: true },
    { id: 312, name: 'Ticket-312', price: 30.0, updatedAt: null, available: false },
    { id: 313, name: 'Ticket-313', price: 17.5, updatedAt: null, available: true },
    { id: 314, name: 'Ticket-314', price: 23.0, updatedAt: null, available: false },
    { id: 315, name: 'Ticket-315', price: 28.5, updatedAt: null, available: true },
    { id: 316, name: 'Ticket-316', price: 20.5, updatedAt: null, available: false },
    { id: 317, name: 'Ticket-317', price: 18.0, updatedAt: null, available: true },
    { id: 318, name: 'Ticket-318', price: 22.0, updatedAt: null, available: true },
    { id: 319, name: 'Ticket-319', price: 26.0, updatedAt: null, available: false }
  ];


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // // Replace 'http://localhost:8080/api/v1/tickets' with your actual API endpoint
    // this.http.get<any[]>('http://localhost:8080/api/v1/tickets').subscribe(
    //   (data) => {
    //     this.tickets = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching tickets:', error);
    //   }
    // );
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

  }
}
