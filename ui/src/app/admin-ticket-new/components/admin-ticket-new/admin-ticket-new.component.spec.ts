import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketNewComponent } from './admin-ticket-new.component';

describe('AdminTicketNewComponent', () => {
  let component: AdminTicketNewComponent;
  let fixture: ComponentFixture<AdminTicketNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTicketNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
