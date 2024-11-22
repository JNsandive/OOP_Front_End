import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('userRole'); // Assume this is set during login/authentication

    if (token) {
      // Check if the user role matches any of the required roles for the route
      const requiredRoles = route.data['roles'] as Array<string>;
      if (requiredRoles && userRole && requiredRoles.includes(userRole)) {
        return true;
      } else {
        alert('You do not have permission to view this page');
        this.router.navigate(['/']); // Redirect to a default or error page
        return false;
      }
    } else {
      alert('Please log in first');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
