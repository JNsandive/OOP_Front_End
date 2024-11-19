import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesLineChartComponent } from './ticket-sales-line-chart.component';

describe('TicketSalesLineChartComponent', () => {
  let component: TicketSalesLineChartComponent;
  let fixture: ComponentFixture<TicketSalesLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSalesLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSalesLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
