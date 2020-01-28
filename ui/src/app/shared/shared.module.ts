import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { pipes } from './pipes';

@NgModule({
  declarations: [
    ...components,
    ...pipes,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    ...components,
    ...pipes,
  ],
})
export class SharedModule {}
