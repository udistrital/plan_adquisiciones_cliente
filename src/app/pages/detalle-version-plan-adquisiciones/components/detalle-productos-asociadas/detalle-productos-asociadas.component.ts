import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-productos-asociadas',
  templateUrl: './detalle-productos-asociadas.component.html',
  styleUrls: ['./detalle-productos-asociadas.component.scss']
})
export class DetalleProductosAsociadasComponent implements OnInit {
  @Input() datos: any;
  configuracion: any;
  Datos: any[];

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    const formatoTabla = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.Datos = [];
  }

  ngOnInit() {
    this.Datos = this.MontarProductosAsociados(this.datos['registro_funcionamiento-productos_asociados']);
  }
  MontarProductosAsociados(elementos: any[]) {
    return elementos.map((elemento) => {
      return {
        IdRegistro: elemento.Id,
        ActivoRegistro: elemento.Activo,
        PorcentajeDistribucion: elemento.PorcentajeDistribucion,
        PorcentajeDistribucion2: elemento.PorcentajeDistribucion / 100,
        ...elemento.ProductoData
      }
    });
  }
}
