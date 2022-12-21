import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { concatMap, from, map, Subject, takeUntil, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateNewOrderTypeComponent } from '../create-new-order-type/create-new-order-type.component';
import { CreateNewOrderComponent } from '../create-new-order/create-new-order.component';
import { DeleteOrderTypeComponent } from '../delete-order-type/delete-order-type.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { Order } from '../models/order-model';
import { DateService } from '../services/date.service';
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
  public ordersArray: Array<Array<Order>> = [];
  public dt: string = "";

  constructor(
    private orderService: OrderService,
    private router: Router,
    private cookieService: CookieService,
    public dateService: DateService,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.date = this.dateService.getDate();
    this.dt = this.date.split("T")[0];
    this.getOrdersByWeek();
  }

  public getOrdersByWeek() {
    this.orderService.getOrdersByWeek().pipe(
      takeUntil(this.unSub$),
      concatMap(orders => from(orders)),
      map(order => {
        order.plannedCompletionDate = new Date(order.plannedCompletionDate);
        return order;
      }),
      toArray()
    ).subscribe(orders => {
      this.orders = orders;
      this.ordersArray = this.orderService.assignOrders(orders);
    });
  }

  changeView():void {
    this.router.navigateByUrl("/" + environment.getOrderByDayUrl);
  }

  changeDate() {
    if (this.dt == "") {
      this.date = this.dateService.convertDateToLocalDateTime(new Date());
    }
    else {
      this.date = this.dt + "T00:00:00";
    }
    this.cookieService.set("date", this.date);
    this.getOrdersByWeek();
  }

  createNewOrder(): void {
    this.dialogRef.open(CreateNewOrderComponent, {
      width:'50%'
    });
  }

  editOrder(orderId: number): void {
    let order = this.orders.find(order => order.orderId === orderId);
    console.log(order);
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
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].orderId == orderId) {
            this.orders.splice(i, 1);
            return;
          }
        }
      }
    )
  }

  addNewOrderType(): void {
    this.dialogRef.open(CreateNewOrderTypeComponent, {
      width:'50%'
    });
  }

  deleteOrderType(): void {
    this.dialogRef.open(DeleteOrderTypeComponent, {
      width:'50%'
    });
  }

  onNeedUpdate(): void {
    this.getOrdersByWeek();
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }
}
