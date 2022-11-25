import { Component } from '@angular/core';

import { User as User } from '../models/login-view.model';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { DateService } from '../services/date.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

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
    private router: Router,
    private dateService: DateService,
    private cookieService: CookieService
  ) { }

  public authUser(): void {
    this.authService.sendLoginRequest(this.user).pipe(
      catchError(err => {
        alert("Something went wrong")
        return err
      }),
    ).subscribe(res => {
      let date = this.dateService.getCurrentDate();
      this.cookieService.set("id", res.body)
      console.log("/" + environment.getOrderByDayUrl + res.body + "/" + date)
      this.router.navigateByUrl("/" + environment.getOrderByDayUrl + res.body + "/" + date);
    });
  }


  goToSignUp(): void {
    
  }
}