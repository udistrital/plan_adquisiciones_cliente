import { Component, OnInit } from '@angular/core';
import { DATOS_PRUEBA, CONFIGURACION_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-metas',
  templateUrl: './table-metas.component.html',
  styleUrls: ['./table-metas.component.scss']
})
export class TableMetasComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  constructor() {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }

  ngOnInit() {
  }

}
