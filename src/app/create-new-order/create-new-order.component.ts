import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { OrderType } from '../models/order-type-model';
import { Order } from '../models/order-model';
import { OrderTypeService } from '../services/order-type.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-create-new-order',
  templateUrl: './create-new-order.component.html',
  styleUrls: ['./create-new-order.component.css']
})
export class CreateNewOrderComponent implements OnInit, OnDestroy {
  private unSub$: Subject<void> = new Subject();

  public orderTypes: Array<OrderType> = []
  public order: Order = {
    orderId: 0,
    userId: 0,
    orderTypeId: "",
    title: "",
    description: "",
    price: 0,
    client: "",
    plannedCompletionDate: new Date(),
    quantity: 0,
    completed: false
  }

  constructor(
    private dialogRef: MatDialog,
    private cookieService: CookieService,
    private ordersService: OrderService,
    private orderTypeService: OrderTypeService
    ) { }

  ngOnInit(): void {
    this.orderTypeService.getOrderTypesByUserId().pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(
      res => {
        this.orderTypes = res
      }
    )
  }

  cancel() {
    this.dialogRef.closeAll();
  }
  
  addNewOrder() {
    this.order.userId = Number(this.cookieService.get("id"))
    console.log(this.order.quantity)
    console.log(this.order.orderTypeId)
    console.log(this.order.plannedCompletionDate)
    this.ordersService.createNewOrder(this.order).pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(
      res => {
        this.cancel()
        window.location.reload()
      }
    )
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }

}
