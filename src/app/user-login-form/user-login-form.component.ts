import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

/**
 * Implements a form that allows users to login to the site
 */
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Login method to check login credentials and set their user and token.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open('Logged in', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['/movies']);
      },
      (error) => {
        console.error('Login failed. Error:', error);
        this.snackBar.open(
          'Login failed. Please check your credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
