import { Component, Input, OnInit } from '@angular/core';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import { CONFIGURACION_TABLA_ACTIVIDADES_FUENTES } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-actividades-fuentes',
  templateUrl: './detalle-actividades-fuentes.component.html',
  styleUrls: ['./detalle-actividades-fuentes.component.scss']
})
export class DetalleActividadesFuentesComponent implements OnInit {

  @Input() datos: any;
  configuracion: any;
  DatosTabla: any[];

  constructor(
    private translateHelper: TranslateFormItemsHelper,
  ) {
  }

  ngOnInit() {
    const configuracion_tabla_activiades_fuentes = this
      .translateTableConfiguracion(CONFIGURACION_TABLA_ACTIVIDADES_FUENTES);
    const formatoTabla = JSON.parse(JSON.stringify(configuracion_tabla_activiades_fuentes));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.DatosTabla = this.MontarActividades(this.datos['registro_plan_adquisiciones-actividad']);
  }

  private translateTableConfiguracion(conf: any): any {
    return this.translateHelper.translateItemTableConfiguration(conf);
  }

  MontarActividades(actividades: any[]) {
    return actividades.map((actividad) => {
      return {
        ActividadId: {
          Id2: actividad.actividad.Numero + '.' +
            actividad.actividad.MetaId.Numero,
          Nombre: actividad.actividad.Nombre,
          Valor: actividad.Valor,
        },
        Valor: actividad.Valor,
        FuentesFinanciamiento: this.MontarFuentes(actividad.FuentesFinanciamiento, actividad.Valor),
      };
    });
  }

  MontarFuentes(fuentes: any[], valorActividad: any) {
    return fuentes.map((fuente) => {
      return {
        Codigo: fuente.FuenteFinanciamiento,
        Nombre: fuente.Nombre,
        Valor: fuente.ValorAsignado,
        Porcentaje: fuente.ValorAsignado / valorActividad,
      };
    });
  }
}
