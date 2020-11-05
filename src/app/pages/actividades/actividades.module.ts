import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromActividades from './reducers/actividades.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActividadesEffects } from './effects/actividades.effects';
import { FormActividadesComponent } from './components/form-actividades/form-actividades.component';
import { TableActividadesComponent } from './components/table-actividades/table-actividades.component';
import { SharedModule } from '../../shared/shared.module';
import { CardMetaComponent } from './components/card-meta/card-meta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, FormActividadesComponent, TableActividadesComponent, CardMetaComponent],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromActividades.actividadesFeatureKey, fromActividades.reducer),
    EffectsModule.forFeature([ActividadesEffects])
  ]
})
export class ActividadesModule { }
