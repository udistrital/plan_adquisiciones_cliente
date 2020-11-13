import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { GetVigenciaActual } from '../../../../shared/actions/shared.actions';
import { getAreaFuncional, getCentroGestor, getVigenciaActual } from '../../../../shared/selectors/shared.selectors';
import { ActualizarLineamiento, CrearLineamiento } from '../../actions/lineamientos.actions';
import { getFuenteRecursoSeleccionada, getLineamientoSeleccionado } from '../../selectors/lineamientos.selectors';

@Component({
  selector: 'ngx-form-lineamientos',
  templateUrl: './form-lineamientos.component.html',
  styleUrls: ['./form-lineamientos.component.scss']
})
export class FormLineamientosComponent implements OnInit, OnDestroy {

  titulo: any;
  subscription$: any;
  vigencia: any;

  LineamientoForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear / Editar Lineamiento';
    this.store.dispatch(GetVigenciaActual({ offset: null }));
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getLineamientoSeleccionado),
      this.store.select(getVigenciaActual),
      this.store.select(getAreaFuncional),
      this.store.select(getCentroGestor),
      this.store.select(getFuenteRecursoSeleccionada),
    ]).subscribe(([lineamiento, vigencia, area, centro, fuente]) => {
      if (lineamiento && vigencia && area && centro && fuente) {
        if (Object.keys(lineamiento)[0] === 'type') {
          this.CrearLineamientoForm(null, vigencia, area, centro, fuente);
        } else {
          this.CrearLineamientoForm(lineamiento);
        }
      }
      // else {
      //   this.CrearLineamientoForm(null, vigencia, area, centro, fuente);
      // }
    });
    // this.subscription2$ = this.store.select(getLineamientoSeleccionado),
  }

  CrearLineamientoForm(lineamiento: any, vigencia?: any, area?: any, centro?: any, fuente?: any) {
    if (lineamiento) {
      this.titulo = 'Editar Lineamiento';
      this.boton = 'Editar';
      this.LineamientoForm = this.fb.group({
        Activo: [lineamiento.Activo, []],
        AreaFuncionalId: [lineamiento.AreaFuncionalId, []],
        CentroGestor: [lineamiento.CentroGestor, []],
        FechaCreacion: [lineamiento.FechaCreacion, []],
        FechaModificacion: [lineamiento.FechaModificacion, []],
        FuenteRecursoId: [lineamiento.FuenteRecursoId, []],
        Id: [lineamiento.Id, []],
        Nombre: [lineamiento.Nombre, [Validators.required]],
        Numero: [lineamiento.Numero, [Validators.required]],
        Objetivo: [lineamiento.Objetivo, [Validators.required]],
        Vigencia: [lineamiento.Vigencia, []],
      });
    } else {
      this.titulo = 'Crear Lineamiento';
      this.boton = 'Crear';
      this.LineamientoForm = this.fb.group({
        Activo: [true, []],
        AreaFuncionalId: [area.Id, []],
        CentroGestor: [centro.CentroGestor, []],
        FechaCreacion: ['', []],
        FechaModificacion: ['', []],
        FuenteRecursoId: [fuente.Codigo, []],
        Id: [null, []],
        Nombre: ['', [Validators.required]],
        Numero: ['', [Validators.required]],
        Objetivo: ['', [Validators.required]],
        Vigencia: [vigencia[0].valor, []],
      });
    }
  }
  OnSubmit() {
    const lineamiento: any = this.LineamientoForm.value;
    if (lineamiento.Id === null) {
      this.store.dispatch(CrearLineamiento(lineamiento));
    } else {
      this.store.dispatch(ActualizarLineamiento(lineamiento));
    }
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
