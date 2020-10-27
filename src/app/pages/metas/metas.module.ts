import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetasRoutingModule } from './metas-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MetasRoutingModule,
    SharedModule,
  ]
})
export class MetasModule { }
