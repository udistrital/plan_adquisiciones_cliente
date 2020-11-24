import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroPlanAdquisicionesRoutingModule } from './registro-plan-adquisiciones-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SeleccionRubroComponent } from './components/seleccion-rubro/seleccion-rubro.component';
import { SeleccionMetaProductoComponent } from './components/seleccion-meta-producto/seleccion-meta-producto.component';
import { SeleccionFuenteComponent } from './components/seleccion-fuente/seleccion-fuente.component';
import { SeleccionDatosGeneralesComponent } from './components/seleccion-datos-generales/seleccion-datos-generales.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    SeleccionRubroComponent,
    SeleccionMetaProductoComponent,
    SeleccionFuenteComponent,
    SeleccionDatosGeneralesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroPlanAdquisicionesRoutingModule
  ]
})
export class RegistroPlanAdquisicionesModule { }
