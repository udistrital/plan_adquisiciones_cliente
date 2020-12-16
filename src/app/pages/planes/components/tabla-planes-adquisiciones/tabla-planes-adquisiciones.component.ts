import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarPlanes, ConsultarPlanes, SeleccionarPlan } from '../../actions/planes.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';
import { getPlanes } from '../../selectors/planes.selectors';

@Component({
  selector: 'ngx-tabla-planes-adquisiciones',
  templateUrl: './tabla-planes-adquisiciones.component.html',
  styleUrls: ['./tabla-planes-adquisiciones.component.scss']
})
export class TablaPlanesAdquisicionesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;

  subscription$: any;
  subscription2$: any;
  subscription3$: any;

  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
  ) {
    this.configuracion = CONFIGURACION_PRUEBA;
    this.store.dispatch(LoadAccionTabla(null));
    this.store.dispatch(ConsultarPlanes({}));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    // Cargar planes Asociados
    this.subscription$ = this.store.select(getPlanes).subscribe((planes: any) => {
      if (this.sharedService.IfStore(planes)) {
        if (Object.keys(planes[0][0]).length !== 0) {
          this.datosPrueba = planes[0];
        } else {
          this.datosPrueba = [];
        }
      }
    });
    // Seleccionar Nuevo Plan
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {

      if (this.sharedService.IfStore(accion)) {
        this.store.dispatch(SeleccionarPlan(null));
        this.route.navigate(['pages/plan-adquisiciones/planes/crear-plan-adquisiciones']);
      }
    });
    // Seleccionar Fila Tabla
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        this.store.dispatch(SeleccionarPlan(accion.fila));
        if (accion.accion.name === 'Editar') {
          this.route.navigate(['pages/plan-adquisiciones/planes/crear-plan-adquisiciones']);
          this.store.dispatch(LoadFilaSeleccionada(null));
        } else {
          if (accion.accion.name === 'Ver') {
            this.route.navigate(['pages/plan-adquisiciones/planes/detalle-plan-adquisiciones']);
            this.store.dispatch(LoadFilaSeleccionada(null));
          }
        }
      }
    });
  }
}
