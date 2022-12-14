import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWeekComponent } from './orders-week.component';

describe('OrdersWeekComponent', () => {
  let component: OrdersWeekComponent;
  let fixture: ComponentFixture<OrdersWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
