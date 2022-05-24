import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import * as fromShared from './reducers/shared.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './effects/shared.effects';
import { GeneralTableComponent } from './components/general-table/general-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTablePipe } from './pipes/filter-table.pipe';
import { CustomTablePipe } from './pipes/custom-table.pipe';
import { DatosGeneralesInicialesComponent } from './components/datos-generales-iniciales/datos-generales-iniciales.component';
import { MouseOverDirective } from './directives/mouse-over.directive';
import { ArbolRubroComponent } from './components/arbol-rubro/arbol-rubro.component';
import { NbTreeGridModule } from '@nebular/theme';
import { SelectedRowDirective } from './directives/selected-row.directive';
import { MultiPipePipe } from './pipes/multi-pipe.pipe';
import { TimeRangePipe } from './pipes/time-range.pipe';
import { CellViewComponent } from './components/cell-view/cell-view.component';
import { CompoundCellComponent } from './components/compound-cell/compound-cell.component';
import { BtnVolverComponent } from './components/btn-volver/btn-volver.component';
import { TablaPlanAdquisicionesComponent } from './components/tabla-plan-adquisiciones/tabla-plan-adquisiciones.component';
import { TablaRubrosPlanComponent } from './components/tabla-rubros-plan/tabla-rubros-plan.component';
import { OrdinalPipePipe } from './pipes/ordinal-pipe.pipe';

@NgModule({
  exports: [
    TranslateModule,
    GeneralTableComponent,
    DatosGeneralesInicialesComponent,
    MouseOverDirective,
    ArbolRubroComponent,
    SelectedRowDirective,
    TimeRangePipe,
    BtnVolverComponent,
    TablaPlanAdquisicionesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbTreeGridModule,
    StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducer),
    EffectsModule.forFeature([SharedEffects]),
    TranslateModule
  ],
  declarations: [
    GeneralTableComponent,
    FilterTablePipe,
    CustomTablePipe,
    DatosGeneralesInicialesComponent,
    MouseOverDirective,
    ArbolRubroComponent,
    SelectedRowDirective,
    MultiPipePipe,
    TimeRangePipe,
    CellViewComponent,
    CompoundCellComponent,
    BtnVolverComponent,
    TablaPlanAdquisicionesComponent,
    TablaRubrosPlanComponent,
    OrdinalPipePipe,
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
    CustomTablePipe,
    TimeRangePipe,
    OrdinalPipePipe,
    TitleCasePipe,
  ]
})

export class SharedModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

