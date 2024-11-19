import { Routes } from '@angular/router';
import { TicketSalesLineChartComponent } from './ticket-sales-line-chart/ticket-sales-line-chart.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {VendorDashboardComponent} from './vendor-dashboard/vendor-dashboard.component'; // Import the new home component
import { AuthGuard } from './guards/auth.guard'; // Custom route guard

// Add export to the routes constant
// export const routes: Routes = [
//   { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'CONSUMER' } },
//   { path: 'vendor-dashboard', component: VendorDashboardComponent, canActivate: [AuthGuard], data: { role: 'VENDOR' } },
//   { path: '', component: HomeComponent }, // Home component for root path
//   { path: 'ticket-sales', component: TicketSalesLineChartComponent },
//   {path:'login',component:LoginComponent },
//   {path:'registration',component:RegisterFormComponent},
//   { path: '**', redirectTo: '' } // Redirect unknown paths to the home page
// ];

export const routes: Routes = [
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'CONSUMER', animation: 'CustomerDashboard' } },
  { path: 'vendor-dashboard', component: VendorDashboardComponent, canActivate: [AuthGuard], data: { role: 'VENDOR', animation: 'VendorDashboard' } },
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } }, // Home component for root path
  { path: 'ticket-sales', component: TicketSalesLineChartComponent, data: { animation: 'TicketSales' } },
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: 'registration', component: RegisterFormComponent, data: { animation: 'RegistrationPage' } },
  { path: '**', redirectTo: '', data: { animation: 'NotFound' } } // Redirect unknown paths to the home page
];
