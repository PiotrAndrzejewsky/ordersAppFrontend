import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrdersWeekComponent } from './orders-week/orders-week.component';
import { OrdersDayComponent } from './orders-day/orders-day.component';
import { CreateNewOrderComponent } from './create-new-order/create-new-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditOrderComponent } from './edit-order/edit-order.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersWeekComponent,
    OrdersDayComponent,
    CreateNewOrderComponent,
    EditOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
