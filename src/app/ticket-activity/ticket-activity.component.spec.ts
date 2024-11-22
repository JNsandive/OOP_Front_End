import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketActivityComponent } from './ticket-activity.component';

describe('PurchasedTicketsComponent', () => {
  let component: TicketActivityComponent;
  let fixture: ComponentFixture<TicketActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
