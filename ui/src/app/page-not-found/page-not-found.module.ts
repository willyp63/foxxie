import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { components } from './components';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule,
    PageNotFoundRoutingModule,
  ],
})
export class PageNotFoundModule {}
