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

  assignOrders(orders: Array<Order>): Array<Array<Order>> {
    let mondays = [];
    let tuesdays = [];
    let wednesdays = [];
    let thursdays = [];
    let fridays = [];
    let saturdays = [];
    let sundays = [];
    let ordersArray = [mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays];

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].plannedCompletionDate.getDay() == 0) {
        sundays.push(orders[i])
      }
      else if (orders[i].plannedCompletionDate.getDay() == 1) {
        mondays.push(orders[i])
      }
      else if (orders[i].plannedCompletionDate.getDay() == 2) {
        tuesdays.push(orders[i])
      }
      else if (orders[i].plannedCompletionDate.getDay() == 3) {
        wednesdays.push(orders[i])
      }
      else if (orders[i].plannedCompletionDate.getDay() == 4) {
        thursdays.push(orders[i])
      }
      else if (orders[i].plannedCompletionDate.getDay() == 5) {
        fridays.push(orders[i])
      }
      else if (orders[i].plannedCompletionDate.getDay() == 6) {
        saturdays.push(orders[i])
      }
    }
    for (let i = 0; i < ordersArray.length; i++) {
      ordersArray[i] = this.sortOrdersByDate(ordersArray[i]);
    }
    return ordersArray;
  }
}