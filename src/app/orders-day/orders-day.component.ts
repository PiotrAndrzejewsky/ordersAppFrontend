import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { concatMap, from, map, Subject, takeUntil, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateNewOrderTypeComponent } from '../create-new-order-type/create-new-order-type.component';
import { CreateNewOrderComponent } from '../create-new-order/create-new-order.component';
import { DeleteOrderTypeComponent } from '../delete-order-type/delete-order-type.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { Order } from '../models/order-model';
import { OrderType } from '../models/order-type-model';
import { DateService } from '../services/date.service';
import { OrderTypeService } from '../services/order-type.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-day',
  templateUrl: './orders-day.component.html',
  styleUrls: ['./orders-day.component.css']
})
export class OrdersDayComponent implements OnInit, OnDestroy {

  private date: string = "";
  private unSub$: Subject<void> = new Subject();

  public orders: Array<Order> = [];
  public orderTypes: Array<OrderType> = [];
  public dt: string = "";

  constructor(
    private dialogRef: MatDialog,
    private orderService: OrderService,
    public dateService: DateService,
    private router: Router,
    private orderTypeService: OrderTypeService,
    private cookieService: CookieService
  ) { }


  ngOnInit(): void {
    this.date = this.dateService.getDate();
    this.dt = this.date.split("T")[0];
    this.changeDate();
    this.getOrderTypes();
  }

  getOrdersByDay() {
    this.orderService.getOrdersByDay().pipe(
      takeUntil(this.unSub$),
      concatMap(orders => from(orders)),
      map(order => {
        order.plannedCompletionDate = new Date(order.plannedCompletionDate);
        return order;
      }),
      toArray()
    ).subscribe(orders => {
      this.orders = this.orderService.sortOrdersByDate(orders)
    });
  }

  getOrderTypes() {
    this.orderTypeService.getOrderTypesByUserId().pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        this.orderTypes = res;
      }
    )
  }

  getOrderType(orderTypeId: string): string  {
    let id = Number(orderTypeId);
    for (let i = 0; i < this.orderTypes.length; i++) {
      if (this.orderTypes[i].orderTypeId == id) {
        return this.orderTypes[i].name;
      }
    }
    return "";
  }

  changeDate() {
    if (this.dt == "") {
      this.date = this.dateService.convertDateToLocalDateTime(new Date());
    }
    else {
      this.date = this.dt + "T00:00:00";
    }
    this.cookieService.set("date", this.date);
    this.getOrdersByDay();
  }

  editOrder(orderId: number): void {
    let order = this.orders.find(order => order.orderId === orderId)
    this.dialogRef.open(EditOrderComponent, {
      width:'50%',
      data: order
    }).afterClosed().pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        this.getOrdersByDay();
      }
    );
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

  changeCompletionStatus(orderId: number): void {
    this.orderService.changeCompletionStatus(orderId).pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        for (let order of this.orders) {
          if (order.orderId == orderId) {
            order.completed = !order.completed;
          }
        }
      }
    );
  }

  onNeedUpdate() {
    console.log("dziala")
    this.getOrdersByDay();
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }
}
