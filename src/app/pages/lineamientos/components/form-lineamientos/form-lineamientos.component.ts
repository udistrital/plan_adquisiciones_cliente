import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GetVigenciaActual } from '../../../../shared/actions/shared.actions';
import { getVigenciaActual } from '../../../../shared/selectors/shared.selectors';
import { getLineamientoSeleccionado } from '../../selectors/lineamientos.selectors';

@Component({
  selector: 'ngx-form-lineamientos',
  templateUrl: './form-lineamientos.component.html',
  styleUrls: ['./form-lineamientos.component.scss']
})
export class FormLineamientosComponent implements OnInit {

  titulo: any;
  subscription$: any;
  subscription2$: any;

  LineamientoForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear / Editar Lineamiento';
    this.store.dispatch(GetVigenciaActual({offset: null}))
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getLineamientoSeleccionado).subscribe((lineamiento: any) => {
      // console.log(lineamiento)
      if (lineamiento) {
        if (Object.keys(lineamiento)[0] === 'type') {
          this.CrearLineamientoForm(null);
        } else {
          this.CrearLineamientoForm(lineamiento);
        }
      } else {
        this.CrearLineamientoForm(null);
      }
    });
    this.subscription2$ = this.store.select(getVigenciaActual).subscribe((vigencia:any) => {
      console.log(vigencia)
    })
  }

  CrearLineamientoForm(lineamiento: any) {
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
        AreaFuncionalId: ['', []],
        CentroGestor: ['', []],
        FechaCreacion: ['', []],
        FechaModificacion: ['', []],
        FuenteRecursoId: ['', []],
        Id: ['', []],
        Nombre: ['', [Validators.required]],
        Numero: ['', [Validators.required]],
        Objetivo: ['', [Validators.required]],
        Vigencia: ['', []],
      });
    }
  }
}
