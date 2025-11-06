import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIssuesComponent } from './customer-issues.component';

describe('CustomerIssuesComponent', () => {
  let component: CustomerIssuesComponent;
  let fixture: ComponentFixture<CustomerIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerIssuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
