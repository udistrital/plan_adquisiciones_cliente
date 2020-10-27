import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetasRoutingModule } from './metas-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { FormMetasComponent } from './components/form-metas/form-metas.component';
import { TableMetasComponent } from './components/table-metas/table-metas.component';


@NgModule({
  declarations: [LayoutComponent, FormMetasComponent, TableMetasComponent],
  imports: [
    CommonModule,
    MetasRoutingModule,
    SharedModule,
  ]
})
export class MetasModule { }
