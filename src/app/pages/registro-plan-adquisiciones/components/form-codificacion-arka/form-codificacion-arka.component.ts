import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { CargarElementosARKA } from '../../actions/registro-plan-adquisiciones.actions';
import { DATOS_PRUEBA_2 } from '../../interfaces/interfaces';
import { getElementosARKA } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-form-codificacion-arka',
  templateUrl: './form-codificacion-arka.component.html',
  styleUrls: ['./form-codificacion-arka.component.scss']
})
export class FormCodificacionArkaComponent implements OnInit {

  titulo: string;
  boton: string;
  Elementos: any;
  ElementoARKAForm: any;
  subscription$: any;
  index: any;
  ElementosTabla: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
  ) {
    this.titulo = 'Agregar Elemento ARKA';
    this.boton = 'Crear';
    this.Elementos = DATOS_PRUEBA_2;
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getFilaSeleccionada),
      this.store.select(getElementosARKA),
    ]).subscribe(([fila, elementos]) => {
      console.log(fila)
      this.index = null;
      if (fila) {
        if (Object.keys(fila)[0] !== 'type' && fila.accion.title === 'Editar Elemento') {
          this.titulo = 'Editar Elemento ARKA';
          this.boton = 'Editar';
          this.index = fila.index;
          this.CrearElementoARKAForm(fila.fila);
        } else {
          this.titulo = 'Agregar Elemento ARKA';
          this.boton = 'Crear';
          this.CrearElementoARKAForm(null);
        }
      } else {
        this.titulo = 'Agregar Elemento ARKA';
        this.boton = 'Crear';
        this.CrearElementoARKAForm(null);
      }
      if (elementos) {
        if (Object.keys(elementos)[0] !== 'type') {
          this.ElementosTabla = elementos[0];
        }
      }
    });
  }

  CrearElementoARKAForm(data: any) {
    if (data) {
      this.ElementoARKAForm = this.fb.group({
        Elemento: [this.Elementos.find((element: any) => element.Codigo === data.Codigo), [Validators.required]]
      });
    } else {
      this.ElementoARKAForm = this.fb.group({
        Elemento: [null, [Validators.required]]
      });
    }
  }

  OnSubmit() {
    if (this.index === null) {
      this.ElementosTabla.push(this.ElementoARKAForm.value.Elemento);
      this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    } else {
      this.ElementosTabla[this.index] = this.ElementoARKAForm.value.Elemento;
      this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    }
  }

}
