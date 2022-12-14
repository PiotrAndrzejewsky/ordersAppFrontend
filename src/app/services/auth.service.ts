import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/login-view.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  public sendLoginRequest(user: User): Observable<any> {
    return this.http.post<number>(`${environment.baseUrl}user/login`, user, { observe: 'response'}).pipe(
      tap((res: any)=>{
        this.cookieService.set(environment.AccessToken, res.headers.get(`${environment.AccessToken}`)!);
        this.cookieService.set(environment.RefreshToken, res.headers.get(`${environment.RefreshToken}`)!);
        this.cookieService.set("username", user.username);
      })
    )
  }

  public saveUser(user: User) {
    let url = environment.baseUrl + "user/save"
    return this.http.post<boolean>(url, user, { observe: 'response'})
  }
}
