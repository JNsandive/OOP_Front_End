import { Component } from '@angular/core';
import {AfterViewInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket-sales-line-chart',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, RouterOutlet, HttpClientModule, CanvasJSAngularChartsModule,TicketSalesLineChartComponent,
  ],
  templateUrl: './ticket-sales-line-chart.component.html',
  styleUrl: './ticket-sales-line-chart.component.css'
})
export class TicketSalesLineChartComponent implements AfterViewInit{
  title = 'Ticket Sales Chart';
  dataPoints: any = [];
  chart: any;

  constructor(private http: HttpClient) {
  }

  chartOptions = {
    theme: "light2",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: "Ticket Sales Over Time"
    },
    axisX: {
      title: "Time",
      valueFormatString: "DD MMM YYYY HH:mm",
      interval: 1,
      intervalType: "day" // Change intervalType based on the time data granularity
    },
    axisY: {
      title: "Tickets Sold",
      includeZero: true
    },
    data: [{
      type: "line",
      name: "Tickets Sold",
      xValueType: "dateTime",
      dataPoints: this.dataPoints
    }]
  };

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  ngAfterViewInit() {
    this.http.get('http://localhost:8080/api/v1/tickets/sales', { responseType: 'json' }).subscribe(
      (response: any) => {
        console.log(response); // Log the response to check the structure

        // Create an object to aggregate the number of tickets sold per day
        const salesCountByDate: { [key: string]: number } = {};

        for (let i = 0; i < response.length; i++) {
          const saleDate = new Date(response[i].updatedAt).toISOString().split('T')[0]; // Get the date part only (YYYY-MM-DD)

          if (salesCountByDate[saleDate]) {
            salesCountByDate[saleDate] += 1; // Increment count for existing date
          } else {
            salesCountByDate[saleDate] = 1; // Initialize count for a new date
          }
        }

        // Convert the aggregated data into dataPoints for the chart
        for (const date in salesCountByDate) {
          if (salesCountByDate.hasOwnProperty(date)) {
            this.dataPoints.push({
              x: new Date(date), // Use the date as the x-value
              y: salesCountByDate[date] // Number of tickets sold on that date as the y-value
            });
          }
        }

        // Sort dataPoints by date to ensure the chart displays them in order
        this.dataPoints.sort((a: { x: Date }, b: { x: Date }) => a.x.getTime() - b.x.getTime());

        // Remove the "Loading Data..." subtitle if it exists and render the chart
        if (this.chart && this.chart.subtitles.length > 0) {
          this.chart.subtitles[0].remove();
        }

        if (this.chart) {
          this.chart.render(); // Render the chart with the updated data
        } else {
          console.warn('Chart instance not found.');
        }
      },
      (error) => {
        console.error("Error fetching ticket data:", error);
      }
    );
  }

}

