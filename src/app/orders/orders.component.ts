import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private date: string = ""

  constructor(
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.date = params["date"]
    })
    let url = this.router.url;
    if (url.includes("day")) {
      console.log("day")
    }
    else if (url.includes("week")) {
      this.getOrdersByWeek()
    }
    else {
      alert("Something went wrong, try again later")
    }
  }

  public getOrdersByWeek() :Array<Order> {
    let orders = new Array();
    this.orderService.getOrdersByWeek(this.date).pipe(
      catchError(err => {
        alert(err)
        return err
      }),
    ).subscribe(res => {
      console.log(res);
      // orders = res
    })
    return orders
  }

}
