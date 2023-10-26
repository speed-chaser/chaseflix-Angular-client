// navbar.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to navigate after logging out.

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
/**
 * Navbar component displays a navigational bar at the top of the page that help users navigate the site
 * or logout when they are done.
 */
export class NavbarComponent {
  constructor(private router: Router) {}

  /**
   * Function to check if a user is logged in or not.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  /**
   * Allows the user to logout.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }

  /**
   * routing to the home page.
   */
  goHome(): void {
    this.router.navigate(['/welcome']);
  }

  /**
   * routing to the movies page.
   */
  goToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * routing to my LinkedIn.
   */
  openContact(): void {
    window.open(
      'https://www.linkedin.com/in/chase-brooke-050a14179/',
      '_blank'
    );
  }
}
