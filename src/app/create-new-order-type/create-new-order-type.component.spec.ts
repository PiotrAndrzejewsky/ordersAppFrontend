import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewOrderTypeComponent } from './create-new-order-type.component';

describe('CreateNewOrderTypeComponent', () => {
  let component: CreateNewOrderTypeComponent;
  let fixture: ComponentFixture<CreateNewOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewOrderTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
