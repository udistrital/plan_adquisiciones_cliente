import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MetasService } from '../../../metas/services/metas.service';
import { RegistroPlanAdquisicionesModule } from '../../registro-plan-adquisiciones.module';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-meta-producto',
  templateUrl: './seleccion-meta-producto.component.html',
  styleUrls: ['./seleccion-meta-producto.component.scss']
})
export class SeleccionMetaProductoComponent implements OnInit {

  MetaForm: any;
  Productos: any;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private metaService: MetasService,
    private fb: FormBuilder,
  ) {
    this.MetaForm = this.fb.group({
      MetaSeleccionada: [null, [Validators.required]],
      ProductoSeleccionado: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.registroService.getProductos().subscribe((data: any) => {
      this.Productos = data;
      console.log(data);
    })
    this.metaService.getMetasRubro('3-01-001-04-05-03-0123').subscribe((data) => {
      console.log(data);
    })
  }

}
