import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositpaymentComponent } from './depositpayment.component';

describe('DepositpaymentComponent', () => {
  let component: DepositpaymentComponent;
  let fixture: ComponentFixture<DepositpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
