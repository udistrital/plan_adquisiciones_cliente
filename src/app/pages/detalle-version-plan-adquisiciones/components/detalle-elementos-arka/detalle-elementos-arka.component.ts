import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_ELEMENTOS_ARKA } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-elementos-arka',
  templateUrl: './detalle-elementos-arka.component.html',
  styleUrls: ['./detalle-elementos-arka.component.scss']
})
export class DetalleElementosArkaComponent implements OnInit {

  @Input() datos: any;
  configuracion: any;
  Datos: any[];

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private translateHelper: TranslateFormItemsHelper
  ) {

  }

  ngOnInit() {
    const configuracion_tabla_elementos_arka = this.translateTableConfiguracion(CONFIGURACION_TABLA_ELEMENTOS_ARKA);
    const formatoTabla = JSON.parse(JSON.stringify(configuracion_tabla_elementos_arka));
    formatoTabla.dataConfig[0].pipe.config[0] = (data: any) => {
      return data.split('-')[0];
    };
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.Datos = this.MontarElementosARKA(this.datos['registro_plan_adquisiciones-codigo_arka']);
  }

  private translateTableConfiguracion(conf: any): any {
    return this.translateHelper.translateItemTableConfiguration(conf);
  }

  MontarElementosARKA(elementos: any[]) {
    return elementos.map((elemento) => {
      const Nombre = (elemento.Descripcion as string).split('-')[1];
      return {
        Activo: elemento.Activo,
        Id: parseFloat(elemento.CodigoArka),
        Descripcion: elemento.Descripcion,
        Nombre: Nombre,
        CodigoArkaId: elemento.Id,
      };
    });
  }

}
