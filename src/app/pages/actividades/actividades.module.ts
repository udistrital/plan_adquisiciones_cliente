import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromActividades from './reducers/actividades.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActividadesEffects } from './effects/actividades.effects';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    StoreModule.forFeature(fromActividades.actividadesFeatureKey, fromActividades.reducer),
    EffectsModule.forFeature([ActividadesEffects])
  ]
})
export class ActividadesModule { }
