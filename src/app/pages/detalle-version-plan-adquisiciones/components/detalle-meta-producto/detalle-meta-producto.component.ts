import { Component, Input, OnInit } from '@angular/core';
import { MetasService } from '../../../metas/services/metas.service';
import { RegistroPlanAdquisicionesService } from '../../../registro-plan-adquisiciones/services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-detalle-meta-producto',
  templateUrl: './detalle-meta-producto.component.html',
  styleUrls: ['./detalle-meta-producto.component.scss']
})
export class DetalleMetaProductoComponent implements OnInit {

  @Input() datos: any;
  meta: any;
  producto: any;

  constructor(
    private metaService: MetasService,
    private registroService: RegistroPlanAdquisicionesService,
  ) {
  }

  ngOnInit() {
    this.metaService.getMeta(this.datos.MetaId).subscribe((meta: any) => {
      this.meta = meta[0];
    });
    this.registroService.getProductos(this.datos.ProductoId).subscribe((producto: any) => {
      this.producto = producto;
    });
  }

}
