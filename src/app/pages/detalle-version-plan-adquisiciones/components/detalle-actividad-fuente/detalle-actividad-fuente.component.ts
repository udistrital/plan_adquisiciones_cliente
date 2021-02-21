import { Component, Input, OnInit } from '@angular/core';
import { ActividadesService } from '../../../actividades/services/actividades.service';

@Component({
  selector: 'ngx-detalle-actividad-fuente',
  templateUrl: './detalle-actividad-fuente.component.html',
  styleUrls: ['./detalle-actividad-fuente.component.scss']
})
export class DetalleActividadFuenteComponent implements OnInit {

  @Input() datos: any;

  Actividad: any;
  Fuente: any;

  constructor(
  ) {
  }

  ngOnInit() {
    this.Fuente = this.datos.FuenteFinanciamientoData;
    this.Actividad = this.datos.ActividadData;
  }

}
