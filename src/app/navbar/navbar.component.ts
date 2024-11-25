import {Component, OnInit, Renderer2} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    CommonModule
  ]
})
export class NavbarComponent implements OnInit {
  userRole: string | null = '';

  constructor(private router: Router, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole'); // Fetch the userRole from localStorage
  }


  onLogoutClick() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onHomeClick() {
    if (localStorage.getItem('userRole') === 'CONSUMER') {
      this.router.navigate(['/customer-dashboard']);
    } else if (localStorage.getItem('userRole') === 'VENDOR') {
      this.router.navigate(['/vendor-dashboard']);
    }
  }

  onProfileClick() {
    if (localStorage.getItem('userRole') === 'CONSUMER') {
      this.router.navigate(['/edit-customer']);
    } else if (localStorage.getItem('userRole') === 'VENDOR') {
      this.router.navigate(['/edit-vendor']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onActivityClick() {
    this.router.navigate(['/ticket-activity']);
  }

  // Vendor-specific navigation methods
  onControlPanelClick() {
    this.router.navigate(['/control-panel']);
  }

  onAddTicketsClick() {
    this.router.navigate(['/add-tickets']);
  }

  onChartsClick() {
    this.router.navigate(['/ticket-sales']);
  }

  onAllLogsClick() {
    this.router.navigate(['/all-logs']);
  }

  onConfigurationClick() {
    this.router.navigate(['/configuration']);
  }

  isVendor(): boolean {
    return localStorage.getItem('userRole') === 'VENDOR';
  }


}
