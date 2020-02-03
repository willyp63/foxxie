import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { components } from './components';
import { AdminTicketNewRoutingModule } from './admin-ticket-new-routing.module';

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule,
    AdminTicketNewRoutingModule,
  ]
})
export class AdminTicketNewModule { }
