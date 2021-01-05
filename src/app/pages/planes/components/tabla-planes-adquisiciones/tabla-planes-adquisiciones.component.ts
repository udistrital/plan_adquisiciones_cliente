import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarPlanDetallado, CargarPlanes, CargarVersionesPlan, ConsultarPlanDetallado, ConsultarPlanes, ConsultarVersionesPlan, SeleccionarPlan } from '../../actions/planes.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA, DATOS_PRUEBA_3 } from '../../interfaces/interfaces';
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
    private parametrics: ParametricService,
    private popupManager: PopUpManager
  ) {
    this.configuracion = CONFIGURACION_PRUEBA;
    this.store.dispatch(LoadAccionTabla(null));
    this.store.dispatch(ConsultarPlanes({}));
    this.parametrics.CargarArbolRubros('3');
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
        if (accion.accion.name === 'Editar') {
          this.store.dispatch(SeleccionarPlan(accion.fila));
          this.route.navigate(['pages/plan-adquisiciones/planes/crear-plan-adquisiciones']);
          this.store.dispatch(LoadFilaSeleccionada(null));
        }
        if (accion.accion.name === 'Ver') {
          this.store.dispatch(SeleccionarPlan(accion.fila));
          this.store.dispatch(CargarPlanDetallado(null));
          this.route.navigate(['pages/plan-adquisiciones/planes/detalle-plan-adquisiciones']);
          this.store.dispatch(LoadFilaSeleccionada(null));
        }
        if (accion.accion.name === 'Versiones') {
          if (accion.fila.Publicado === true) {
            this.store.dispatch(SeleccionarPlan(accion.fila));
            this.store.dispatch(ConsultarVersionesPlan(accion.fila));
            // this.store.dispatch(CargarVersionesPlan([DATOS_PRUEBA_3]));
            this.route.navigate(['pages/plan-adquisiciones/planes/versiones-plan-adquisiciones']);
            this.store.dispatch(LoadFilaSeleccionada(null));
          } else {
            this.popupManager.showInfoAlert(
              'Este Plan de Adquisiciones no se ha Publicado',
              'No Hay Publicaciones'
            );
          }

        }
      }
    });
  }
}
