import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrdersDayComponent } from './orders-day/orders-day.component';
import { OrdersWeekComponent } from './orders-week/orders-week.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"orders/week/:id/:date",
    component:OrdersWeekComponent
  },
  {
    path:"orders/day/:id/:date",
    component:OrdersDayComponent
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
