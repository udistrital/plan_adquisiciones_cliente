import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../actions/shared.actions';
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
  Subtotal: any;
  stringBusqueda: string;
  datosPrueba: any[];
  rowspanTitle: number;
  rowspanTable: any[];
  keyCompound: any;

  constructor(
    private store: Store<any>,
  ) {
    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
    this.rowspanTitle = 1;
  }

  ngOnInit() {
    if (this.config.endSubtotal) {
      if (!this.config.endSubtotal.last.name) {
        const arraySubtotal: any[] = [];
        this.datos.forEach((element: any) => {
          if (element.compound) {
            this.rowspanTitle = 2;
          }
          arraySubtotal.push(parseFloat(element[this.config.endSubtotal.property]));
        });
        this.Subtotal = arraySubtotal.reduce((accumulator, currentValue) => accumulator + currentValue);
      }
    }
    let tablespan: any = [];
    this.config.dataConfig.forEach((element: any) => {
      console.log(element.compound)
      if (element.compound !== undefined) {
        this.rowspanTitle = 2;
        this.keyCompound = element.key;
      }
    });
    console.log(this.keyCompound)
    if (this.keyCompound !== undefined) {
      this.datos.forEach(element => {
        tablespan.push(element[this.keyCompound].length + 1);
      });
    }
    console.log(tablespan)
    this.rowspanTable = tablespan;

  }

  SelectedAction(action: any, row: any, index: any) {

    this.store.dispatch(LoadFilaSeleccionada({
      titulo: this.config.title,
      accion: action,
      fila: row,
      index: index,
    }));
  }

  SelectedAllAction(action: any) {

    this.store.dispatch(LoadAccionTabla({
      titulo: this.config.title,
      accion: action,
    }));

  }

}
