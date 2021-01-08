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
    console.log(this.datos)
    this.DatosTabla = this.MontarActividades(this.datos);
  }

  MontarActividades(actividades: any[]) {
    return actividades.map((actividad) => {
      return {
        ActividadId: {
          Id: actividad.actividad.numero + '.' +
            actividad.actividad.meta.numero + '.' +
            actividad.actividad.meta.lineamiento.numero,
          Nombre: actividad.actividad.nombre,
          Valor: actividad.valor,
        },
        Valor: actividad.valor,
        FuentesFinanciamiento: this.MontarFuentes(actividad.registroinversionactividadfuentefinanciamiento, actividad.valor),
      };
    });
  }

  MontarFuentes(fuentes: any[], valorActividad: any) {
    return fuentes.map((fuente) => {
      return {
        Codigo: fuente.fuentefinanciamientoid,
        Nombre: fuente.nombre,
        Valor: fuente.valorasignado,
        Porcentaje: fuente.valorasignado / valorActividad,
      };
    });
  }
}
