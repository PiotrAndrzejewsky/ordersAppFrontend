import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "../models/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) { }

    // TODO: interceptor
    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.cookieService.get(environment.AccessToken)}`
    });
    

  getOrdersByWeek(date: string): Observable<Array<Order>> {
    let url = environment.baseUrl + environment.getOrderByWeekUrl + this.cookieService.get("id") + "/" + date
    return this.http.get<Array<Order>>(url, {headers: this.headers})
  } 

  getOrdersByDay(date: string): Observable<Array<Order>> {
    let url = environment.baseUrl + environment.getOrderByDayUrl + this.cookieService.get("id") + "/" + date
    return this.http.get<Array<Order>>(url, {headers: this.headers})
  }

  createNewOrder(order: Order): Observable<boolean> {
    let url = environment.baseUrl + environment.createNewOrderUrl;
    return this.http.post<boolean>(url, order, {headers: this.headers})
  }

  sortOrdersByDate(orders: Array<Order>): Array<Order> {
    let sortedOrders = orders.sort((a, b) => {
      if (a.plannedCompletionDate < b.plannedCompletionDate) {
        return -1;
      }
      if (a.plannedCompletionDate > b.plannedCompletionDate) {
        return 1;
      }
      return 0;
    })
    return sortedOrders;
  }

  deleteOrder(orderId: number): Observable<boolean>{
    let url = environment.baseUrl + environment.deleteOrderUrl + orderId;
    return this.http.delete<boolean>(url, {headers: this.headers});
  }

  editOrder(order: Order): Observable<boolean> {
    let url = environment.baseUrl + environment.updateOrderUrl + order.orderId;
    console.log(this.headers)
    return this.http.patch<boolean>(url, order, {headers: this.headers});
  }

  changeCompletionStatus(orderId: number): Observable<boolean> {
    let url = environment.baseUrl + environment.markOrderAsDoneUrl + orderId;
    return this.http.post<boolean>(url, null, {headers: this.headers});
  }
}