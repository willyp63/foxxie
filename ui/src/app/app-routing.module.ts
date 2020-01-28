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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
