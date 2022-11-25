import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/login-view.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
    ) { }

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.cookieService.get(environment.AccessToken)}`
    });
    

  getOrdersByWeek(date: string): Observable<any> {
    let url = environment.baseUrl + environment.getOrderByWeekUrl + this.cookieService.get("id") + "/" + date
    return this.http.get(url, {headers: this.headers}).pipe()
  } 

}