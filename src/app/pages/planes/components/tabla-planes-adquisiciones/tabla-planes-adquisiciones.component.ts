import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SeleccionarPlan } from '../../actions/planes.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-tabla-planes-adquisiciones',
  templateUrl: './tabla-planes-adquisiciones.component.html',
  styleUrls: ['./tabla-planes-adquisiciones.component.scss']
})
export class TablaPlanesAdquisicionesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;

  subscription$: any;

  constructor(
    private store: Store<any>,
    private route: Router,
  ) {
    this.configuracion = CONFIGURACION_PRUEBA;
    this.datosPrueba = DATOS_PRUEBA;
    this.store.dispatch(LoadAccionTabla(null));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          this.store.dispatch(SeleccionarPlan(null));
          this.route.navigate(['pages/plan-adquisiciones/planes/crear-plan-adquisiciones']);
        }
      }
    });
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          this.store.dispatch(SeleccionarPlan(accion.fila));
          if (accion.accion.name === 'Editar') {
            this.route.navigate(['pages/plan-adquisiciones/planes/crear-plan-adquisiciones']);
            this.store.dispatch(LoadFilaSeleccionada(null));
          }
        }
      }
    });
  }
}
