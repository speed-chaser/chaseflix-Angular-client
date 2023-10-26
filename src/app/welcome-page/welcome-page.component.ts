import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
/**
 * The welcome page displays a basic welcome screen with the register / login buttons if you aren't logged in.
 * If you are logged in, this page displays a basic welcome message and a link to the React version of the project.
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Opens the signup form.
   */
  openRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  /**
   * Opens the login form.
   */
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
  /**
   * Routes to the original version of the project.
   */
  openMainProject(): void {
    window.open('https://chaseflix.netlify.app', '_blank');
  }

  /**
   * Boolean to check whether a user is logged in or not.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
