import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { concatMap, from, map, Subject, takeUntil, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateNewOrderComponent } from '../create-new-order/create-new-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { Order } from '../models/order.model';
import { DateService } from '../services/date.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-day',
  templateUrl: './orders-day.component.html',
  styleUrls: ['./orders-day.component.css']
})
export class OrdersDayComponent implements OnInit, OnDestroy {

  private date: string = "";
  private unSub$: Subject<void> = new Subject();

  public orders: Array<Order> = []
  public dt: string = new Date().toISOString().split('T')[0];

  constructor(
    private dialogRef: MatDialog,
    private orderService: OrderService,
    private route: ActivatedRoute,
    public dateService: DateService,
    private router: Router,
    private cookieService: CookieService
  ) { }
  

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.unSub$)
    ).subscribe(params => {
      this.date = params["date"]
    })
    this.getOrdersByDay()
    
    
  }

  getOrdersByDay() {
    this.orderService.getOrdersByDay(this.date).pipe(
      takeUntil(this.unSub$),
      concatMap(orders => from(orders)),
      map(order => { 
        order.plannedCompletionDate = new Date(order.plannedCompletionDate);
        return order;
      }),
      toArray()
    ).subscribe(orders => this.orders = this.orderService.sortOrdersByDate(orders));
  }

  changeDate() {
    if (this.dt == "") {
      this.date = this.dateService.convertDateToLocalDateTime(new Date())
    }
    else {
      this.date = this.dt + "T00:00:00"
    }
    this.getOrdersByDay()
  }

  createNewOrder(): void {
    this.dialogRef.open(CreateNewOrderComponent, {
      width:'50%'
    });
  }

  editOrder(orderId: number): void {
    let order = this.orders.find(order => order.orderId === orderId)
    this.dialogRef.open(EditOrderComponent, {
      width:'50%',
      data: order
    });
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(
      res => {
        window.location.reload();
      }
    )
  }

  changeCompletionStatus(orderId: number): void {
    this.orderService.changeCompletionStatus(orderId).pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        window.location.reload();
      }
    )
  }

  changeView():void {
    this.router.navigateByUrl("/" + environment.getOrderByWeekUrl + this.cookieService.get("id") + "/" + this.date);
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }
}
