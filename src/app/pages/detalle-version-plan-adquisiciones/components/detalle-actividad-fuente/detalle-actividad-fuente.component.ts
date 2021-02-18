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
    private actividadesService: ActividadesService
  ) { }

  ngOnInit() {
    this.actividadesService.getActividad(this.datos.ActividadId).subscribe((meta: any) => {
      this.Actividad = meta[0];
      this.Fuente = this.datos.FuenteFinanciamientoData;
    });
  }

}
