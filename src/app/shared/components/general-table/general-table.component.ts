import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {

  @Input() config: any;
  @Input() datos: any;
  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;
  datosPrueba: any[];

  constructor() {
    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
  }

  ngOnInit() {

  }

}
