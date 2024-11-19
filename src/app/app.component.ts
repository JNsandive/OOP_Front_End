import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TicketSalesLineChartComponent} from './ticket-sales-line-chart/ticket-sales-line-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicketSalesLineChartComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontEndOOP';
}
