import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineamientosRoutingModule } from './lineamientos-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { FormLineamientosComponent } from './components/form-lineamientos/form-lineamientos.component';
import { SharedModule } from '../../shared/shared.module';
import { TableLineamientosComponent } from './components/table-lineamientos/table-lineamientos.component';


@NgModule({
  declarations: [LayoutComponent, FormLineamientosComponent, TableLineamientosComponent],
  imports: [
    CommonModule,
    LineamientosRoutingModule,
    SharedModule,
  ]
})
export class LineamientosModule { }
