import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, LoginGuard } from '@shared/guards';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin-home/admin-home.module').then(m => m.AdminHomeModule)
  },
  {
    path: 'admin/new',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin-ticket-new/admin-ticket-new.module').then(m => m.AdminTicketNewModule)
  },
  {
    path: 'admin/:ticketId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin-ticket-edit/admin-ticket-edit.module').then(m => m.AdminTicketEditModule)
  },
  {
    path: '404',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
