import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import {
  LoadAccionTabla,
  LoadFilaSeleccionada,
} from '../../../../shared/actions/shared.actions';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import {
  getAccionTabla,
  getFilaSeleccionada,
} from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { SharedService } from '../../../../shared/services/shared.service';
import {
  CargarPlanDetallado,
  ConsultarPlanes,
  ConsultarVersionesPlan,
  SeleccionarPlan,
} from '../../actions/planes.actions';
import { CONFIGURACION_TABLA_PLANES_DE_ADQUISICIONES } from '../../interfaces/interfaces';
import { getPlanes } from '../../selectors/planes.selectors';

@Component({
  selector: 'ngx-tabla-planes-adquisiciones',
  templateUrl: './tabla-planes-adquisiciones.component.html',
  styleUrls: ['./tabla-planes-adquisiciones.component.scss'],
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
    private popupManager: PopUpManager,
    private translateHelper: TranslateFormItemsHelper,
    private translate: TranslateService,
  ) {
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
    this.translateTableConfiguracion();
    // Cargar planes Asociados
    this.subscription$ = this.store
      .select(getPlanes)
      .subscribe((planes: any) => {
        if (this.sharedService.IfStore(planes)) {
          if (planes[0][0] && Object.keys(planes[0][0]).length) {
            this.datosPrueba = planes[0];
          } else {
            this.datosPrueba = [];
          }
        }
      });
    // Seleccionar Nuevo Plan
    this.subscription2$ = this.store
      .select(getAccionTabla)
      .subscribe((accion) => {
        if (this.sharedService.IfStore(accion)) {
          this.store.dispatch(SeleccionarPlan(null));
          this.route.navigate([
            'pages/plan-adquisiciones/planes/crear-plan-adquisiciones',
          ]);
        }
      });
    // Seleccionar Fila Tabla
    this.subscription3$ = this.store
      .select(getFilaSeleccionada)
      .subscribe((accion) => {
        if (this.sharedService.IfStore(accion)) {
          if (accion.accion.name === 'Editar') {
            this.store.dispatch(SeleccionarPlan(accion.fila));
            this.route.navigate([
              'pages/plan-adquisiciones/planes/crear-plan-adquisiciones',
            ]);
            this.store.dispatch(LoadFilaSeleccionada(null));
          }
          if (accion.accion.name === 'Ver') {
            this.store.dispatch(SeleccionarPlan(accion.fila));
            this.store.dispatch(CargarPlanDetallado(null));
            this.route.navigate([
              'pages/plan-adquisiciones/planes/detalle-plan-adquisiciones',
            ]);
            this.store.dispatch(LoadFilaSeleccionada(null));
          }
          if (accion.accion.name === 'Versiones') {
            if (accion.fila.Publicado === true) {
              this.store.dispatch(SeleccionarPlan(accion.fila));
              this.store.dispatch(ConsultarVersionesPlan(accion.fila));
              this.route.navigate([
                'pages/plan-adquisiciones/planes/versiones-plan-adquisiciones',
              ]);
              this.store.dispatch(LoadFilaSeleccionada(null));
            } else {
              this.popupManager.showInfoAlert(
                this.translate.instant('AVISOS.plan_adquisiciones_no_publicado'),
                this.translate.instant('AVISOS.sin_publicaciones')
              );
            }
          }
        }
      });

    this.sharedService.RetornarAlInicio(
      'planes',
      'pages/plan-adquisiciones/planes/tabla-general'
    );
  }

  private translateTableConfiguracion(): void {
    this.configuracion = this.translateHelper
      .translateItemTableConfiguration(CONFIGURACION_TABLA_PLANES_DE_ADQUISICIONES);
  }
}
