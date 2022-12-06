import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { OrderType } from '../models/order-type.model';
import { Order } from '../models/order.model';
import { OrderTypeService } from '../services/order-type.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit, OnDestroy {
  private unSub$: Subject<void> = new Subject();

  public orderTypes: Array<OrderType> = []
  public editForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public order: Order,
    private orderTypeService: OrderTypeService,
    private dialogRef: MatDialog,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderTypeService.getOrderTypesByUserId().pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(
      res => {
        this.orderTypes = res;
      }
    )
    this.setForm();
  }

  setForm(): void {
    let date = this.order.plannedCompletionDate.toISOString().substring(0,11) + this.order.plannedCompletionDate.toLocaleTimeString().substring(0, 5);
    this.editForm = new FormGroup({
      title: new FormControl(this.order.title),
      description: new FormControl(this.order.description),
      orderTypeId: new FormControl(this.order.orderTypeId),
      price: new FormControl(this.order.price),
      client: new FormControl(this.order.client),
      plannedDate: new FormControl(date),
      quantity: new FormControl(this.order.quantity)
    })
  }

  editOrder() {
    this.orderService.editOrder(this.order).pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        this.cancel();
        window.location.reload();
      }

    )
  }

  cancel() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }

}
