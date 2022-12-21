import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, take } from 'rxjs';
import { Router } from '@angular/router';
import { DateService } from '../services/date.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/login-view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {
    username: "",
    password: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.cookieService.deleteAll();
  }

  public authUser(): void {
    this.authService.sendLoginRequest(this.user).pipe(
      take(1),
      catchError(err => {
        alert("Something went wrong")
        return err
      }),
    ).subscribe(res => {
      this.cookieService.set("id", res.body);
      this.router.navigateByUrl("/" + environment.getOrderByDayUrl);
    });
  }


  goToSignUp(): void {
    this.router.navigateByUrl("/signUp");
  }
}