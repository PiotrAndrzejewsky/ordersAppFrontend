import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { OrderType } from '../models/order-type-model';
import { OrderTypeService } from '../services/order-type.service';

@Component({
  selector: 'app-create-new-order-type',
  templateUrl: './create-new-order-type.component.html',
  styleUrls: ['./create-new-order-type.component.css']
})
export class CreateNewOrderTypeComponent {
  private unSub$: Subject<void> = new Subject();

  public orderType: OrderType = {
    userId: 0,
    orderTypeId: 0,
    name: ""
  }

  constructor(
    private dialogRef: MatDialog,
    private orderTypeService: OrderTypeService
    ) { }

  createNewOrderType() {
    this.orderTypeService.createNewOrderType(this.orderType).pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(res => {
      this.cancel();
    });
  }

  cancel() {
    this.dialogRef.closeAll();
  }

}
