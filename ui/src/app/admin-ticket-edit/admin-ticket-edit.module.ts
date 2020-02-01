import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { components } from './components';
import { AdminTicketEditRoutingModule } from './admin-ticket-edit-routing.module';

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule,
    AdminTicketEditRoutingModule,
  ]
})
export class AdminTicketEditModule { }
