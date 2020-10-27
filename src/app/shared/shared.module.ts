import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  exports: [
    TranslateModule,
    GeneralTableComponent,
    DatosGeneralesInicialesComponent,
    MouseOverDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducer),
    EffectsModule.forFeature([SharedEffects])
  ],
  declarations: [
    GeneralTableComponent,
    FilterTablePipe,
    CustomTablePipe,
    DatosGeneralesInicialesComponent,
    MouseOverDirective,
  ],
})

export class SharedModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

