// navbar.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to navigate after logging out.

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }

  goHome(): void {
    this.router.navigate(['/welcome']);
  }

  goToMovies(): void {
    this.router.navigate(['/movies']);
  }

  openContact(): void {
    window.open(
      'https://www.linkedin.com/in/chase-brooke-050a14179/',
      '_blank'
    );
  }
}
