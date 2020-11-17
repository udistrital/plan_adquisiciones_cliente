import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getLineamientoSeleccionado } from '../../../lineamientos/selectors/lineamientos.selectors';
import { CrearMeta, ActualizarMeta } from '../../actions/metas.actions';
import { getMetaSeleccionada, getRubroSeleccionado } from '../../selectors/metas.selectors';

@Component({
  selector: 'ngx-form-metas',
  templateUrl: './form-metas.component.html',
  styleUrls: ['./form-metas.component.scss']
})
export class FormMetasComponent implements OnInit, OnDestroy {

  titulo: any;
  subscription$: any;

  MetaForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear Meta';
  }

  ngOnInit() {

    this.subscription$ = combineLatest([
      this.store.select(getRubroSeleccionado),
      this.store.select(getLineamientoSeleccionado),
      this.store.select(getMetaSeleccionada),
    ]).subscribe(([rubro, lineamiento, meta]) => {
      if (rubro && lineamiento && meta) {
        if (Object.keys(meta)[0] === 'type') {
          this.CrearMetaForm(null, rubro, lineamiento);
        } else {
          this.CrearMetaForm(meta);
        }
      }
    });
  }

  CrearMetaForm(meta: any, rubro?: any, lineamiento?: any) {
    if (meta) {
      this.titulo = 'Editar Meta';
      this.boton = 'Editar';
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
      this.titulo = 'Crear Meta';
      this.boton = 'Crear';
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
    } else {
      this.store.dispatch(ActualizarMeta(meta));
    }
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
