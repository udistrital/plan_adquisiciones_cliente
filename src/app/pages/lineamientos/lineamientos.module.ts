import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineamientosRoutingModule } from './lineamientos-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { FormLineamientosComponent } from './components/form-lineamientos/form-lineamientos.component';


@NgModule({
  declarations: [LayoutComponent, FormLineamientosComponent],
  imports: [
    CommonModule,
    LineamientosRoutingModule
  ]
})
export class LineamientosModule { }
