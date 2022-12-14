import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderTypeComponent } from './delete-order-type.component';

describe('DeleteOrderTypeComponent', () => {
  let component: DeleteOrderTypeComponent;
  let fixture: ComponentFixture<DeleteOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
