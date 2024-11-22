import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ]
})
export class NavbarComponent {

  constructor(private router: Router) {
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
      this.router.navigate(['/vendor-profile']);
    }else {
      this.router.navigate(['/login']);
    }
  }

  onActivityClick() {
    if (localStorage.getItem('userRole') === 'CONSUMER') {
      this.router.navigate(['/ticket-activity']);
    } else if (localStorage.getItem('userRole') === 'VENDOR') {
      this.router.navigate(['/added-tickets']);
    }
  }

}
