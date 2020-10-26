import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanAdquisicionesRoutingModule } from './plan-adquisiciones-routing.module';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    PlanAdquisicionesRoutingModule
  ]
})
export class PlanAdquisicionesModule { }
