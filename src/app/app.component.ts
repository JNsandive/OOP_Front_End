import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TicketSalesLineChartComponent } from './ticket-sales-line-chart/ticket-sales-line-chart.component';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicketSalesLineChartComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.3s ease-in', style({ opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('0.3s ease-out', style({ opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'frontEndOOP';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
