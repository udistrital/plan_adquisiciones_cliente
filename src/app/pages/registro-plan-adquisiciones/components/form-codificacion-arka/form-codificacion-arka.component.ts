import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { DATOS_PRUEBA_2 } from '../../interfaces/interfaces';

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


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
  ) {
    this.titulo = 'Agregar Elemento ARKA';
    this.boton = 'Crear';
    this.Elementos = DATOS_PRUEBA_2;
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      console.log(fila)
      if (fila) {
        if (Object.keys(fila)[0] !== 'type') {
          this.titulo = 'Editar Elemento ARKA';
          this.boton = 'Editar';
          this.CrearElementoARKAForm(fila.fila)
        } else {
          this.titulo = 'Agregar Elemento ARKA';
          this.boton = 'Crear';
          this.CrearElementoARKAForm(null)
        }
      } else {
        this.titulo = 'Agregar Elemento ARKA';
        this.boton = 'Crear';
        this.CrearElementoARKAForm(null)
      }
    })
  }

  CrearElementoARKAForm(data: any) {
    if (data) {
      this.ElementoARKAForm = this.fb.group({
        Elemento: [this.Elementos.find((element: any) => element.Id === data.Id), [Validators.required]]
      })
    } else {
      this.ElementoARKAForm = this.fb.group({
        Elemento: [null, [Validators.required]]
      })
    }
  }

}
