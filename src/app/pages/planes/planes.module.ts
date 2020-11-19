import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { TablaPlanesAdquisicionesComponent } from './components/tabla-planes-adquisiciones/tabla-planes-adquisiciones.component';
import { CrearPlanAdquisicionComponent } from './components/crear-plan-adquisicion/crear-plan-adquisicion.component';


@NgModule({
  declarations: [LayoutComponent, TablaPlanesAdquisicionesComponent, CrearPlanAdquisicionComponent],
  imports: [
    CommonModule,
    PlanesRoutingModule
  ]
})
export class PlanesModule { }
