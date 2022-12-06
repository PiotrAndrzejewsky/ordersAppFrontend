import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, from, map, Subject, takeUntil, toArray } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-week',
  templateUrl: './orders-week.component.html',
  styleUrls: ['./orders-week.component.css']
})
export class OrdersWeekComponent implements OnInit, OnDestroy {

  private date: string = "";
  private unSub$: Subject<void> = new Subject();

  public orders: Array<Order> = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.unSub$)
    ).subscribe(params => {
      this.date = params["date"]
    })
    this.getOrdersByWeek()
  }

  public getOrdersByWeek() {
    this.orderService.getOrdersByWeek(this.date).pipe(
      takeUntil(this.unSub$),
      concatMap(orders => from(orders)),
      map(order => { 
        order.plannedCompletionDate = new Date(order.plannedCompletionDate);
        return order;
      }),
      toArray()
    ).subscribe(orders => this.orders = orders);
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }
}
