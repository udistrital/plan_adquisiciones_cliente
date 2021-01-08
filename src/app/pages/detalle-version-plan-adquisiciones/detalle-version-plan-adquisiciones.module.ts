import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleVersionPlanAdquisicionesRoutingModule } from './detalle-version-plan-adquisiciones-routing.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DetalleVersionPlanAdquisicionesRoutingModule
  ]
})
export class DetalleVersionPlanAdquisicionesModule { }
