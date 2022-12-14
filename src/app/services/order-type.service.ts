import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderType } from "../models/order-type.model";

@Injectable({
    providedIn: 'root'
})
export class OrderTypeService {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
    ) {}


    getOrderTypesByUserId(): Observable<Array<OrderType>> {
        let url = environment.baseUrl + environment.getOrderTypesByUserUrl + this.cookieService.get("id")
        return this.http.get<Array<OrderType>>(url)
    }
}