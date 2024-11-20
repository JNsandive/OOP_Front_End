import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css'],
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ]
})
export class CustomerNavbarComponent {

}
