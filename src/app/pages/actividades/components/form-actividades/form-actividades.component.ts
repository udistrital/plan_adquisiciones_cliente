import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getMetaSeleccionada } from '../../../metas/selectors/metas.selectors';
import { CrearActividad, ActualizarActividad } from '../../actions/actividades.actions';
import { getActividadSeleccionada } from '../../selectors/actividades.selectors';

@Component({
  selector: 'ngx-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.scss']
})
export class FormActividadesComponent implements OnInit, OnDestroy {

  titulo: any;
  subscription$: any;

  ActividadesForm: FormGroup;
  boton: string;
  Meta: any;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear Actividad';
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getActividadSeleccionada),
      this.store.select(getMetaSeleccionada),
    ]).subscribe(([actividad, meta]) => {
      if (actividad && meta) {
        if (Object.keys(actividad)[0] === 'type') {
          this.Meta = meta;
          this.CrearActividadesForm(null, meta);
        } else {
          this.CrearActividadesForm(actividad);
        }
      }
    });
  }

  CrearActividadesForm(actividad: any, meta?: any) {
    if (actividad) {
      this.titulo = 'Editar Actividad';
      this.boton = 'Editar';
      this.ActividadesForm = this.fb.group({
        Activo: [actividad.Activo, []],
        FechaCreacion: [actividad.FechaCreacion, []],
        FechaModificacion: [actividad.FechaModificacion, []],
        Id: [actividad.Id, []],
        Nombre: [actividad.Nombre, [Validators.required]],
        Numero: [actividad.Numero, [Validators.required]],
        MetaId: [actividad.MetaId, []],
      });
    } else {
      this.titulo = 'Crear Actividad';
      this.boton = 'Crear';
      this.ActividadesForm = this.fb.group({
        Activo: [true, []],
        FechaCreacion: ['', []],
        FechaModificacion: ['', []],
        Id: [null, []],
        Nombre: ['', [Validators.required]],
        Numero: ['', [Validators.required]],
        MetaId: [meta, []],
      });
    }
  }

  OnSubmit() {
    const actividad: any = this.ActividadesForm.value;
    if (actividad.Id === null) {
      this.store.dispatch(CrearActividad(actividad));
      this.CrearActividadesForm(null, this.Meta);
    } else {
      this.store.dispatch(ActualizarActividad(actividad));
      this.CrearActividadesForm(null, this.Meta);
    }
  }
}
