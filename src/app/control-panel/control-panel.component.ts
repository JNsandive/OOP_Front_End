import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  imports: [
    NavbarComponent,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    DatePipe,
    HttpClientModule,
  ],
  standalone: true,
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['activity', 'ticketCount', 'userName', 'time'];
  dataSource = new MatTableDataSource<ActivityData>([]); // Initially empty

  private webSocket!: WebSocketSubject<any>;
  private readonly apiControlUrl = 'http://localhost:8080/api/v1/simulation';
  private readonly wsUrl = 'ws://localhost:8080/ws/ticket-sales';
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.connectWebSocket();
  }

  ngOnDestroy() {
    if (this.webSocket) {
      this.webSocket.unsubscribe(); // Close WebSocket on component destruction
    }
    if (this.reconnectInterval) {
      this.reconnectInterval.unsubscribe();
    }
  }

  // WebSocket connection with retry logic
  private connectWebSocket() {
    this.webSocket = new WebSocketSubject(this.wsUrl);

    this.webSocket.subscribe({
      next: (message) => this.handleWebSocketMessage(message),
      error: (error) => {
        console.error('WebSocket error:', error);
        this.reconnectWebSocket();
      },
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  // Retry WebSocket connection
  private reconnectWebSocket() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Maximum reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect... (${this.reconnectAttempts})`);

    this.reconnectInterval = interval(5000).subscribe(() => {
      console.log('Retrying WebSocket connection...');
      this.connectWebSocket();
    });
  }

  // Handle incoming WebSocket messages
  private handleWebSocketMessage(message: any) {
    console.log('WebSocket message received:', message);

    if (message?.type && message?.data) {
      switch (message.type) {
        case 'INIT':
          console.log('Initialization message:', message.data);
          break;
        case 'ADD':
          this.addTicketsToTable(message.data);
          break;
        case 'PURCHASE':
          this.addPurchaseToTable(message.data);
          break;
        default:
          console.warn('Unknown message type:', message.type);
      }
    } else {
      console.warn('Unexpected WebSocket message format:', message);
    }
  }

  // Add tickets to the table
  private addTicketsToTable(data: any) {
    const { vendorName, ticketsAdded, ticketIds } = data;

    const newRows = ticketIds.map((ticketId: number) => ({
      activity: 'Added Ticket',
      ticketCount: ticketsAdded,
      userName: vendorName,
      time: new Date(),
    }));

    this.dataSource.data = [...this.dataSource.data, ...newRows];
  }

  // Add purchases to the table
  private addPurchaseToTable(data: any) {
    const { customerName, ticketsPurchased, ticketIds } = data;

    const newRows = ticketIds.map((ticketId: number) => ({
      activity: 'Purchased Ticket',
      ticketCount: ticketsPurchased,
      userName: customerName,
      time: new Date(),
    }));

    this.dataSource.data = [...this.dataSource.data, ...newRows];
  }

  // Button Actions
  onStart() {
    this.http.post<any>(`${this.apiControlUrl}/start`, {}).subscribe({
      next: (response) => {
        alert(response.message); // Display the success message
      },
      error: (error) => {
        console.error('Error sending start command:', error);
        if (error.error && error.error.message) {
          alert('Error: ' + error.error.message); // Show error message returned from the backend
        } else {
          alert('An unexpected error occurred while sending the start command.');
        }
      },
    });
  }

  onPause() {
    this.http.post<any>(`${this.apiControlUrl}/pause`, {}).subscribe({
      next: (response) => {
        console.log('Pause command sent successfully:', response);
        alert(response.message); // Show the success message returned from the backend
      },
      error: (error) => {
        console.error('Error sending pause command:', error);
        if (error.error && error.error.message) {
          alert('Error: ' + error.error.message); // Display backend error message
        } else {
          alert('An unexpected error occurred while sending the pause command.');
        }
      },
    });
  }

  onResume() {
    this.http.post<any>(`${this.apiControlUrl}/resume`, {}).subscribe({
      next: (response) => {
        console.log('Resume command sent successfully:', response);
        alert(response.message); // Show the success message returned from the backend
      },
      error: (error) => {
        console.error('Error sending resume command:', error);
        if (error.error && error.error.message) {
          alert('Error: ' + error.error.message); // Display backend error message
        } else {
          alert('An unexpected error occurred while sending the resume command.');
        }
      },
    });
  }

}

// Interface for Activity Data
export interface ActivityData {
  activity: string;
  ticketCount: number;
  userName: string;
  time: Date;
}
