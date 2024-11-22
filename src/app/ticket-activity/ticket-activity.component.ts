import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ticket-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    NavbarComponent,
    HttpClientModule,
  ],
  templateUrl: './ticket-activity.component.html',
  styleUrls: ['./ticket-activity.component.css'],
})
export class TicketActivityComponent implements AfterViewInit, OnInit {
  tickets: any[] = [];
  displayedColumns: string[] = ['number', 'action', 'performedBy', 'ticketId', 'timestamp'];
  dataSource = new MatTableDataSource(this.tickets);
  totalItems = 0;
  headerTitle: string = '';
  headerSubtitle: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    console.log('User role:', role); // Log the user role for debugging

    if (role === 'CONSUMER') {
      this.headerTitle = 'Tickets You Have Purchased';
      this.headerSubtitle = 'Below is the record of tickets you have purchased.';
    } else if (role === 'VENDOR') {
      this.headerTitle = 'Tickets You Have Added';
      this.headerSubtitle = 'Below is the record of tickets you have added.';
    } else {
      console.error('Unknown user role:', role); // Log an error if the role is unknown
      alert('Error: Unknown user role');
      return;
    }

    this.fetchPurchasedTickets(0, 12); // Initial fetch with default pagination values
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => this.onPageChange(event));
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex; // Use the exact page index provided by the paginator
    const pageSize = event.pageSize; // Use the selected page size
    this.fetchPurchasedTickets(pageIndex, pageSize);
  }

  fetchPurchasedTickets(pageIndex: number, pageSize: number): void {
    const apiUrl = 'http://localhost:8080/api/v1/activityLogs';
    const userId = this.getUserIdFromToken();
    console.log('User ID:', userId);

    if (!userId) {
      alert('Error: Unable to fetch user ID from token');
      return;
    }

    const params = {
      page: pageIndex.toString(),
      size: pageSize.toString(),
      performedBy: userId.toString(),
    };

    this.http.get<any>(apiUrl, { params }).subscribe({
      next: (response) => {
        console.log('Fetched purchased tickets:', response);
        // Map response content to include sequential numbering
        this.tickets = response.content.map((ticket: any, index: number) => ({
          number: index + 1 + pageIndex * pageSize, // Calculate row numbers correctly
          ...ticket,
        }));
        this.dataSource.data = this.tickets; // Update dataSource
        this.totalItems = response.totalElements; // Update total items for pagination
        console.log('Fetched purchased tickets:', response.totalElements);
        this.paginator.length = this.totalItems; // Set total items in paginator
        console.log('Fetched purchased tickets:', this.tickets);
        console.log('Total purchased tickets:', this.totalItems);
        console.log('Current page:', pageIndex);
        console.log('Page size:', pageSize)
      },
      error: (error) => {
        console.error('Error fetching purchased tickets:', error);
        alert('Error fetching purchased tickets');
      },
    });
  }

  private getUserIdFromToken(): number | null {
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
