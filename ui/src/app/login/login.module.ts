import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { components } from './components';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ],
})
export class LoginModule {}
