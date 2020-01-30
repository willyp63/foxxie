import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTicketComponent } from './pickup-ticket.component';

describe('PickupTicketComponent', () => {
  let component: PickupTicketComponent;
  let fixture: ComponentFixture<PickupTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
