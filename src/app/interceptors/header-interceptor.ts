import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
      private cookieService: CookieService,
      private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let accessToken = this.cookieService.get(environment.AccessToken)
    const clonedRequest = req.clone({ headers: req.headers.append('Content-Type', 'application/json').append('Authorization', accessToken) });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 498) {
          this.router.navigateByUrl("/");
          return throwError('Your token has expired');
        }
        return throwError('There was an error processing your request.');
      })
    );
  }

}
