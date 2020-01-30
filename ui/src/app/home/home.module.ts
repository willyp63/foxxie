import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { components } from './components';
import { HomeRoutingModule } from './home-routing.module';
import { PickupTicketComponent } from './components/pickup-ticket/pickup-ticket.component';

@NgModule({
  declarations: [components, PickupTicketComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
