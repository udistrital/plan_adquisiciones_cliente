import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineamientosRoutingModule } from './lineamientos-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { FormLineamientosComponent } from './components/form-lineamientos/form-lineamientos.component';
import { SharedModule } from '../../shared/shared.module';
import { TableLineamientosComponent } from './components/table-lineamientos/table-lineamientos.component';
import { StoreModule } from '@ngrx/store';
import * as fromLineamientos from './reducers/lineamientos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LineamientosEffects } from './effects/lineamientos.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, FormLineamientosComponent, TableLineamientosComponent],
  imports: [
    CommonModule,
    LineamientosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromLineamientos.lineamientosFeatureKey, fromLineamientos.reducer),
    EffectsModule.forFeature([LineamientosEffects]),
  ]
})
export class LineamientosModule { }
