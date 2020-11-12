import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getActividadSeleccionada } from '../../selectors/actividades.selectors';

@Component({
  selector: 'ngx-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.scss']
})
export class FormActividadesComponent implements OnInit {

  titulo: any;
  subscription$: any;

  ActividadesForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear / Editar Actividad';
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getActividadSeleccionada).subscribe((actividad: any) => {

      if (actividad) {
        if (Object.keys(actividad)[0] === 'type') {
          this.CrearActividadesForm(null);
        } else {
          this.CrearActividadesForm(actividad);
        }
      } else {
        this.CrearActividadesForm(null);
      }
    });
  }

  CrearActividadesForm(actividad: any) {
    if (actividad) {
      this.titulo = 'Editar Actividad';
      this.boton = 'Editar';
      this.ActividadesForm = this.fb.group({
        Numero: [actividad.numero, [Validators.required]],
        Nombre: [actividad.nombre, [Validators.required]]
      });
    } else {
      this.titulo = 'Crear Actividad';
      this.boton = 'Crear';
      this.ActividadesForm = this.fb.group({
        Numero: ['', [Validators.required]],
        Nombre: ['', [Validators.required]]
      });
    }
  }

}
