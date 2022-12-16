import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@ngneat/reactive-forms';
import { CookieService } from 'ngx-cookie-service';
import { catchError, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/login-view-model';
import { SignUpUser } from '../models/sign-up-view-model';
import { AuthService } from '../services/auth.service';
import { DateService } from '../services/date.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public user: SignUpUser = {
    username: "",
    password: "",
    password2: ""
  };


  public signUpForm = new FormGroup({
    username: new FormControl(this.user.username, [
      Validators.required,
      Validators.minLength(3)
    ]),

  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private dateService: DateService,
    private cookieService: CookieService
  ) {}
  

  saveUser(): void {
    if (this.comparePasswords()) {
      this.authService.saveUser(this.user).pipe(
        take(1)
      ).subscribe(res => {
        this.authUser(this.user)
      },
      err => {
        alert("Username is taken");
      })  
    }
    else {
      alert("Passwords do not match")
    }
  }

  public authUser(user: User): void {
    this.authService.sendLoginRequest(this.user).pipe(
      take(1),
      catchError(err => {
        alert("Something went wrong")
        return err
      }),
    ).subscribe(res => {
      let date = this.dateService.convertDateToLocalDateTime(new Date());
      this.cookieService.set("id", res.body)
      this.router.navigateByUrl("/" + environment.getOrderByDayUrl + res.body + "/" + date);
    });
  }

  
  goToLogin(): void {
    this.router.navigateByUrl("");
  }

  comparePasswords(): boolean {
    return this.user.password == this.user.password2;
  }

}
