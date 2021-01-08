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


@NgModule({
  declarations: [LayoutComponent],
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
