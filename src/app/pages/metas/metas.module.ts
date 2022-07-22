import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetasRoutingModule } from './metas-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { FormMetasComponent } from './components/form-metas/form-metas.component';
import { TableMetasComponent } from './components/table-metas/table-metas.component';
import { StoreModule } from '@ngrx/store';
import * as fromMetas from './reducers/metas.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MetasEffects } from './effects/metas.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [LayoutComponent, FormMetasComponent, TableMetasComponent],
  imports: [
    CommonModule,
    MetasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromMetas.metasFeatureKey, fromMetas.reducer),
    EffectsModule.forFeature([MetasEffects]),
    MatTooltipModule
  ]
})
export class MetasModule { }
