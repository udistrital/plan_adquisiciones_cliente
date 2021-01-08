import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_ACTIVIDADES_FUENTES } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-actividades-fuentes',
  templateUrl: './detalle-actividades-fuentes.component.html',
  styleUrls: ['./detalle-actividades-fuentes.component.scss']
})
export class DetalleActividadesFuentesComponent implements OnInit {
  configuracion: any;
  Datos: any[];

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    const formatoTabla = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_ACTIVIDADES_FUENTES));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.Datos = [];
    console.log(this.configuracion)
  }

  ngOnInit() {
  }

}
