import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
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
    private translateHelper: TranslateFormItemsHelper
  ) { }

  ngOnInit() {
    const configuracion_tabla_productos_asociados = this.translateTableConfiguracion(CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS);
    const formatoTabla = JSON.parse(JSON.stringify(configuracion_tabla_productos_asociados));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.Datos = this.Datos = this.MontarProductosAsociados(this.datos['registro_funcionamiento-productos_asociados']);
  }

  private translateTableConfiguracion(conf: any): any {
    let configuracion = conf;
    configuracion = this.translateHelper.translateItemTableConfiguration(this.configuracion);
    return configuracion;
  }

  MontarProductosAsociados(elementos: any[]) {
    return elementos.map((elemento) => {
      return {
        IdRegistro: elemento.Id,
        ActivoRegistro: elemento.Activo,
        PorcentajeDistribucion: elemento.PorcentajeDistribucion,
        PorcentajeDistribucion2: elemento.PorcentajeDistribucion / 100,
        ...elemento.ProductoData
      };
    });
  }
}
