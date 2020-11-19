import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { TablaPlanesAdquisicionesComponent } from './components/tabla-planes-adquisiciones/tabla-planes-adquisiciones.component';
import { CrearPlanAdquisicionComponent } from './components/crear-plan-adquisicion/crear-plan-adquisicion.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, TablaPlanesAdquisicionesComponent, CrearPlanAdquisicionComponent],
  imports: [
    CommonModule,
    PlanesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PlanesModule { }
