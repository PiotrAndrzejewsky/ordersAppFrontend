import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { OrderType } from '../models/order-type.model';
import { OrderTypeService } from '../services/order-type.service';

@Component({
  selector: 'app-delete-order-type',
  templateUrl: './delete-order-type.component.html',
  styleUrls: ['./delete-order-type.component.css']
})
export class DeleteOrderTypeComponent implements OnInit {
  private unSub$: Subject<void> = new Subject();
  
  public orderTypes: Array<OrderType> = [];

  constructor(
    private orderTypeService: OrderTypeService,
    private dialogRef: MatDialog
    ) { }

  ngOnInit(): void {
    this.getOrderTypes();
  }

  getOrderTypes() {
    this.orderTypeService.getOrderTypesByUserId().pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(
      res => {
        this.orderTypes = res;
      }
    )
  }

  deleteOrderType(orderTypeId: number) {
    this.orderTypeService.deleteOrderType(orderTypeId).pipe(
      takeUntil(this.unSub$)
    )
    .subscribe(
      res => {
        this.cancel();
      }
    )
  }

  cancel() {
    this.dialogRef.closeAll();
  }

}
