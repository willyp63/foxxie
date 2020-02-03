import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTicketNewComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminTicketNewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTicketNewRoutingModule {}
