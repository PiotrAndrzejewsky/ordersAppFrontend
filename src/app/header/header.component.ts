import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateNewOrderTypeComponent } from '../create-new-order-type/create-new-order-type.component';
import { CreateNewOrderComponent } from '../create-new-order/create-new-order.component';
import { DeleteOrderTypeComponent } from '../delete-order-type/delete-order-type.component';
import { Order } from '../models/order-model';
import { OrderType } from '../models/order-type-model';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private date: string = "";
  private unSub$: Subject<void> = new Subject();

  public orders: Array<Order> = [];
  public orderTypes: Array<OrderType> = [];
  public dt: string = "";

  constructor(
    private dialogRef: MatDialog,
    public dateService: DateService,
    private router: Router,
    private cookieService: CookieService) { }

  @Output() needUpdate = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.date = this.dateService.getDate();
    this.dt = this.date.split("T")[0];
  }

  changeDate() {
    if (this.dt == "") {
      this.date = this.dateService.convertDateToLocalDateTime(new Date());
    }
    else {
      this.date = this.dt + "T00:00:00";
    }
    this.cookieService.set("date", this.date);
    this.needUpdate.emit();
  }

  createNewOrder(): void {
    this.dialogRef.open(CreateNewOrderComponent, {
      width:'50%'
    }).afterClosed().pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        this.needUpdate.emit();
      }
    );
  }

  addNewOrderType(): void {
    this.dialogRef.open(CreateNewOrderTypeComponent, {
      width:'50%'
    }).afterClosed().pipe(
      takeUntil(this.unSub$)
    ).subscribe()
  }

  deleteOrderType(): void {
    this.dialogRef.open(DeleteOrderTypeComponent, {
      width:'50%'
    }).afterClosed().pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      res => {
        this.needUpdate.emit();
      }
    );
  }

  changeView(): void {
    let url = this.router.url;
    if (url.includes("day")) {
      this.router.navigateByUrl("/" + environment.getOrderByWeekUrl);
    }
    else {
      this.router.navigateByUrl("/" + environment.getOrderByDayUrl);
    }
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.unsubscribe();
  }
}
