import { Component, Input, OnInit } from '@angular/core';
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
  ) {
    const formatoTabla = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_ACTIVIDADES_FUENTES));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.DatosTabla = [];
  }

  ngOnInit() {

    this.DatosTabla = this.MontarActividades(this.datos['registro_plan_adquisiciones-actividad']);
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
