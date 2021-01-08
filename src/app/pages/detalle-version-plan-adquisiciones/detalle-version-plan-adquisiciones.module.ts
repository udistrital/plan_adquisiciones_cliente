import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleVersionPlanAdquisicionesRoutingModule } from './detalle-version-plan-adquisiciones-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatAutocompleteModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { NbDatepickerModule } from '@nebular/theme';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../../shared/shared.module';
import { DetalleRubroComponent } from './components/detalle-rubro/detalle-rubro.component';
import { DetalleMetaProductoComponent } from './components/detalle-meta-producto/detalle-meta-producto.component';
import { DetalleDatosGeneralesComponent } from './components/detalle-datos-generales/detalle-datos-generales.component';
import { DetalleActividadesFuentesComponent } from './components/detalle-actividades-fuentes/detalle-actividades-fuentes.component';
import { DetalleElementosArkaComponent } from './components/detalle-elementos-arka/detalle-elementos-arka.component';


@NgModule({
  declarations: [LayoutComponent, DetalleRubroComponent, DetalleMetaProductoComponent, DetalleDatosGeneralesComponent, DetalleActividadesFuentesComponent, DetalleElementosArkaComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatStepperModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatDialogModule,
    NbDatepickerModule,
    ScrollingModule,
    MatSelectModule,
    DetalleVersionPlanAdquisicionesRoutingModule
  ]
})
export class DetalleVersionPlanAdquisicionesModule { }
