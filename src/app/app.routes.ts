import { Routes } from '@angular/router';
import { TicketSalesLineChartComponent } from './ticket-sales-line-chart/ticket-sales-line-chart.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {TicketActivityComponent} from './ticket-activity/ticket-activity.component';
import {VendorDashboardComponent} from './vendor-dashboard/vendor-dashboard.component'; // Import the new home component
import { AuthGuard } from './guards/auth.guard';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {EditVendorComponent} from './edit-vendor/edit-vendor.component'; // Custom route guard



export const routes: Routes = [
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { roles: ['CONSUMER'], animation: 'CustomerDashboard' } },
  { path: 'vendor-dashboard', component: VendorDashboardComponent, canActivate: [AuthGuard], data: { roles: ['VENDOR'], animation: 'VendorDashboard' } },
  { path: 'ticket-activity', component: TicketActivityComponent, canActivate: [AuthGuard], data: { roles: ['CONSUMER', 'VENDOR'], animation: 'PurchasedTickets' } },
  { path: 'edit-customer', component: EditCustomerComponent, canActivate: [AuthGuard], data: { roles: ['CONSUMER'], animation: 'EditCustomer' } },
  {path:'edit-vendor',component:EditVendorComponent, canActivate: [AuthGuard], data: { roles: ['VENDOR'], animation: 'EditVendor' }},
  {path:'control-panel',component:ControlPanelComponent, canActivate: [AuthGuard], data: { roles: ['VENDOR'], animation: 'ControlPanel' }},
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'ticket-sales', component: TicketSalesLineChartComponent, canActivate: [AuthGuard], data: { roles: ['VENDOR'], animation: 'TicketSales' } },
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: 'registration', component: RegisterFormComponent, data: { animation: 'RegistrationPage' } },
  { path: '**', redirectTo: '', data: { animation: 'NotFound' } }
];

