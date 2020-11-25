import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { MetasService } from '../../../metas/services/metas.service';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-meta-producto',
  templateUrl: './seleccion-meta-producto.component.html',
  styleUrls: ['./seleccion-meta-producto.component.scss']
})
export class SeleccionMetaProductoComponent implements OnInit {

  MetaForm: any;
  Productos: any;
  Metas: any;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private metaService: MetasService,
    private fb: FormBuilder,
    private store: Store<any>,
  ) {
    this.MetaForm = this.fb.group({
      MetaSeleccionada: [null, [Validators.required]],
      ProductoSeleccionado: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    // Cargar Productos
    this.registroService.getProductos().subscribe((data: any) => {
      this.Productos = data;
    })
    // Cargar metas seleccionando nodo
    this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (nodo) {
        if (Object.keys(nodo)[0] !== 'type') {
          if (nodo.data && !nodo.children) {
            this.metaService.getMetasRubro(nodo.data.Codigo).subscribe((data) => {
              if (Object.keys(data[0]).length !== 0) {
                this.MetaForm.get('MetaSeleccionada').setValue(null);
                this.Metas = data;
              } else {
                this.MetaForm.get('MetaSeleccionada').setValue(null);
                this.Metas = undefined;
              }
            })
          }
        } else {
          this.MetaForm.get('MetaSeleccionada').setValue(null);
          this.MetaForm.get('ProductoSeleccionado').setValue(null);
          this.Metas = undefined;
        }
      }
    })
  }
}
