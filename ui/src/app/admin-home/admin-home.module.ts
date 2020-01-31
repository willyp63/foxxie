import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { components } from './components';
import { AdminHomeRoutingModule } from './admin-home-routing.module';

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule,
    AdminHomeRoutingModule,
  ]
})
export class AdminHomeModule { }
