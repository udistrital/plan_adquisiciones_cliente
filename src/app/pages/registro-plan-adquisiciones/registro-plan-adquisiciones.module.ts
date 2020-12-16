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
import { StoreModule } from '@ngrx/store';
import * as fromRegistroPlanAdquisiciones from './reducers/registro-plan-adquisiciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RegistroPlanAdquisicionesEffects } from './effects/registro-plan-adquisiciones.effects';
import { NbDatepickerModule } from '@nebular/theme';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { ModalidadesSeleccionComponent } from './components/modalidades-seleccion/modalidades-seleccion.component';
import { TablaCodificacionArkaComponent } from './components/tabla-codificacion-arka/tabla-codificacion-arka.component';
import { FormCodificacionArkaComponent } from './components/form-codificacion-arka/form-codificacion-arka.component';
import { TablaActividadesFuentesComponent } from './components/tabla-actividades-fuentes/tabla-actividades-fuentes.component';
import { FormActividadFuentesComponent } from './components/form-actividad-fuentes/form-actividad-fuentes.component';
import { FormFuentesFinanciamientoComponent } from './components/form-fuentes-financiamiento/form-fuentes-financiamiento.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  declarations: [
    LayoutComponent,
    SeleccionRubroComponent,
    SeleccionMetaProductoComponent,
    SeleccionFuenteComponent,
    SeleccionDatosGeneralesComponent,
    ModalidadesSeleccionComponent,
    TablaCodificacionArkaComponent,
    FormCodificacionArkaComponent,
    TablaActividadesFuentesComponent,
    FormActividadFuentesComponent,
    FormFuentesFinanciamientoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatDialogModule,
    RegistroPlanAdquisicionesRoutingModule,
    NbDatepickerModule,
    ScrollingModule,
    MatSelectModule,
    StoreModule.forFeature(fromRegistroPlanAdquisiciones.registroPlanAdquisicionesFeatureKey, fromRegistroPlanAdquisiciones.reducer),
    EffectsModule.forFeature([RegistroPlanAdquisicionesEffects])
  ],
  entryComponents: [
    FormActividadFuentesComponent,
    FormFuentesFinanciamientoComponent,
  ]
})
export class RegistroPlanAdquisicionesModule { }
