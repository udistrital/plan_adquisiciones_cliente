import { Component, OnInit } from '@angular/core';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-lineamientos',
  templateUrl: './table-lineamientos.component.html',
  styleUrls: ['./table-lineamientos.component.scss']
})
export class TableLineamientosComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  constructor() {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }

  ngOnInit() {
  }

}
