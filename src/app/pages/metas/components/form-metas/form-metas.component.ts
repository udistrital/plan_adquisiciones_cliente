import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { getLineamientoSeleccionado } from '../../../lineamientos/selectors/lineamientos.selectors';
import { CrearMeta, ActualizarMeta } from '../../actions/metas.actions';
import {
  getDeactivateForm,
  getMetaSeleccionada,
  getRubroSeleccionado,
} from '../../selectors/metas.selectors';

@Component({
  selector: 'ngx-form-metas',
  templateUrl: './form-metas.component.html',
  styleUrls: ['./form-metas.component.scss'],
})
export class FormMetasComponent implements OnInit, OnDestroy {
  titulo: any;
  subscription$: any;
  subscription2$: any;

  MetaForm: FormGroup;
  boton: string;
  Rubro: any;

  deactivateForm: boolean;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.titulo = this.translate.instant('META.editar_meta');
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getRubroSeleccionado),
      this.store.select(getMetaSeleccionada),
    ]).subscribe(([rubro, meta]) => {
      if (rubro && meta) {
        if (Object.keys(meta)[0] === 'type') {
          this.Rubro = rubro;
          this.CrearMetaForm(null, rubro, null);
        } else {
          this.CrearMetaForm(meta);
        }
      }
    });
    this.subscription2$ = this.store
      .select(getDeactivateForm)
      .subscribe((deactivateForm) => {
        if (deactivateForm) {
          this.deactivateForm = deactivateForm.deactivateForm;
        }
      });
  }
  CrearMetaForm(meta: any, rubro?: any, lineamiento?: any) {
    if (meta) {
      this.titulo = this.translate.instant('META.editar_meta');
      this.boton = this.translate.instant('GLOBAL.editar');
      this.MetaForm = this.fb.group({
        Activo: [meta.Activo, []],
        FechaCreacion: [meta.FechaCreacion, []],
        FechaModificacion: [meta.FechaModificacion, []],
        Id: [meta.Id, []],
        Nombre: [meta.Nombre, [Validators.required]],
        Numero: [meta.Numero, [Validators.required]],
        Rubro: [meta.Rubro, []],
        LineamientoId: [meta.LineamientoId, []],
      });
    } else {
      this.titulo = this.translate.instant('META.crear_meta');
      this.boton = this.translate.instant('GLOBAL.crear');
      this.MetaForm = this.fb.group({
        Activo: [true, []],
        FechaCreacion: ['', []],
        FechaModificacion: ['', []],
        Id: [null, []],
        Nombre: ['', [Validators.required]],
        Numero: ['', [Validators.required]],
        Rubro: [rubro.data.Codigo, []],
        LineamientoId: [lineamiento, []],
      });
    }
  }
  OnSubmit() {
    const meta: any = this.MetaForm.value;
    if (meta.Id === null) {
      this.store.dispatch(CrearMeta(meta));
      this.CrearMetaForm(null, this.Rubro, null);
    } else {
      this.store.dispatch(ActualizarMeta(meta));
      this.CrearMetaForm(null, this.Rubro, null);
    }
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
