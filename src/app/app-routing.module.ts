import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"orders/week/:id/:date",
    component:OrdersComponent
  },
  {
    path:"orders/day/:id/:date",
    component:OrdersComponent
  },
  {
    path:"**",
    redirectTo:"login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
