import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDayComponent } from './orders-day.component';

describe('OrdersDayComponent', () => {
  let component: OrdersDayComponent;
  let fixture: ComponentFixture<OrdersDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
