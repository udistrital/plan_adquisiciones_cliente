import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getMetaSeleccionada } from '../../selectors/metas.selectors';

@Component({
  selector: 'ngx-form-metas',
  templateUrl: './form-metas.component.html',
  styleUrls: ['./form-metas.component.scss']
})
export class FormMetasComponent implements OnInit {

  titulo: any;
  subscription$: any;

  MetaForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) {
    this.titulo = 'Crear / Editar Meta';
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getMetaSeleccionada).subscribe((meta: any) => {

      if (meta) {
        if (Object.keys(meta)[0] === 'type') {
          this.CrearMetaForm(null);
        } else {
          this.CrearMetaForm(meta);
        }
      } else {
        this.CrearMetaForm(null);
      }
    });
  }

  CrearMetaForm(meta: any) {
    if (meta) {
      this.titulo = 'Editar Meta';
      this.boton = 'Editar';
      this.MetaForm = this.fb.group({
        Numero: [meta.numero, [Validators.required]],
        Nombre: [meta.nombre, [Validators.required]],
      });
    } else {
      this.titulo = 'Crear Meta';
      this.boton = 'Crear';
      this.MetaForm = this.fb.group({
        Numero: ['', [Validators.required]],
        Nombre: ['', [Validators.required]],
      });
    }
  }
}
