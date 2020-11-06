import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getLineamientoSeleccionado } from '../../selectors/lineamientos.selectors';

@Component({
  selector: 'ngx-form-lineamientos',
  templateUrl: './form-lineamientos.component.html',
  styleUrls: ['./form-lineamientos.component.scss']
})
export class FormLineamientosComponent implements OnInit {

  titulo: any;
  subscription$: any;

  LineamientoForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear / Editar Lineamiento';
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getLineamientoSeleccionado).subscribe((lineamiento: any) => {
      console.log(lineamiento)
      if (lineamiento){
        if (Object.keys(lineamiento)[0] === 'type') {
          this.CrearLineamientoForm(null);
        } else {
          this.CrearLineamientoForm(lineamiento);
        }
      } else {
        this.CrearLineamientoForm(null);
      }
    })
  }

  CrearLineamientoForm(lineamiento: any) {
    if (lineamiento) {
      this.titulo = 'Editar Lineamiento';
      this.boton = 'Editar'
      this.LineamientoForm = this.fb.group({
        Numero: [lineamiento.numero, [Validators.required]],  
        Nombre: [lineamiento.nombre, [Validators.required]],
        Objetivo: [lineamiento.objetivo,[Validators.required]]
      })
    } else {
      this.titulo = 'Crear Lineamiento';
      this.boton = 'Crear'
      this.LineamientoForm = this.fb.group({
        Numero: ['', [Validators.required]],  
        Nombre: ['', [Validators.required]],
        Objetivo: ['',[Validators.required]]
      })
    }
  }
}
