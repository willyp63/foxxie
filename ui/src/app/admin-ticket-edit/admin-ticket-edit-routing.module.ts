import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTicketEditComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminTicketEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTicketEditRoutingModule {}
