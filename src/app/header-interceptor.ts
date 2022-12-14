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
      // Clone the request to add the new header
      console.log(req.url);
      let accessToken = this.cookieService.get(environment.AccessToken)
      const clonedRequest = req.clone({ headers: req.headers.append('Content-Type', 'application/json').append('Authorization', accessToken) });
  
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }
  }

//   'Content-Type': 'application/json',
//   'Authorization': `${this.cookieService.get(environment.AccessToken)}`