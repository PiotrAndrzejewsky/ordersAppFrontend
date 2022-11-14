import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { User as User } from '../models/login-view.model';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = {
    username: "",
    password: ""
  };

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  public authUser(): void {
    this.authService.sendLoginRequest(this.user).pipe(
      catchError(err => {
        alert("Something went wrong")
        return err
      }),
    ).subscribe(res => this.router.navigateByUrl);
  }


  goToSignUp(): void {
    // window.location.href = this.signUpUrl;
  }
}