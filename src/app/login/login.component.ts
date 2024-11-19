import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Ensure this is correct
})
export class LoginComponent { }

