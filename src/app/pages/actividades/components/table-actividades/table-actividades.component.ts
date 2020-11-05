import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadActividadSeleccionada } from '../../actions/actividades.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-actividades',
  templateUrl: './table-actividades.component.html',
  styleUrls: ['./table-actividades.component.scss']
})
export class TableActividadesComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  constructor(
    private store: Store<any>,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      // console.log(fila)
      if (fila) {
        // console.log(fila.fila)
        this.store.dispatch(loadActividadSeleccionada(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      // console.log(accion)
      this.store.dispatch(loadActividadSeleccionada(null));
    });
  }
}
