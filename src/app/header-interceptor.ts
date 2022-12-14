import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
  
@Injectable()       
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
      private cookieService: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let accessToken = this.cookieService.get(environment.AccessToken)
    const clonedRequest = req.clone({ headers: req.headers.append('Content-Type', 'application/json').append('Authorization', accessToken) });

    return next.handle(clonedRequest);
  }
}