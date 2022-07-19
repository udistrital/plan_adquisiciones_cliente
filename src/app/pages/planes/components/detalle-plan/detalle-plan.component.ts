import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import {
  LoadAccionTabla,
  LoadFilaSeleccionada,
} from '../../../../shared/actions/shared.actions';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import {
  getArbolRubro,
  getFilaSeleccionada,
} from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActualizarPublicadoConfiguracionService } from '../../../../utils/common/helpers/actualizar-publicado-configuracion.service';
import {
  CargarElementosARKA,
  CargarMeta,
  CargarModalidades,
  CargarProducto,
  CargarRenglonPlan,
  CargarRubro,
  CargarActividades,
  ConsultarRenglonPlan,
  SeleccionarFechaSeleccion,
  SeleccionarFuente,
  SeleccionarResponsable,
  CargarMetasAsociadas,
  CargarProductosAsociados,
  CargarActividadFuente,
} from '../../../registro-plan-adquisiciones/actions/registro-plan-adquisiciones.actions';
import { ConsultarPlanDetallado } from '../../actions/planes.actions';
import { CONFIGURACION_TABLA_DETALLE_PLAN_2 } from '../../interfaces/interfaces';
import {
  getPlanDetallado,
  getPlanSeleccionado,
} from '../../selectors/planes.selectors';
import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'ngx-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.scss'],
})
export class DetallePlanComponent implements OnInit, OnDestroy {
  configuracion: any[];
  configTotal: any;
  datos: any[];
  publicar: any;
  TotalPlan: any;

  subscription$: any;
  subscription2$: any;
  subscription3$: any;
  subscription4$: any;
  Plan: any;
  vigenciaPlan: any;
  desactivarPublicar: boolean = false;

  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
    private planesService: PlanesService,
    private actualizarPlanAdquisicionesService: ActualizarPublicadoConfiguracionService,
    private translate: TranslateService,
    private translateHelper: TranslateFormItemsHelper,
    private popupService: PopUpManager,
  ) {
    this.DispatchActions();
  }

  ngOnInit() {
    this.publicar = this.translate.instant('PLAN_ADQUISICIONES.publicar');
    this.subscription4$ = this.store
      .select(getPlanSeleccionado)
      .subscribe((plan: any) => {
        if (this.sharedService.IfStore(plan)) {
          this.Plan = plan;
          this.store.dispatch(ConsultarPlanDetallado(plan));
          if (this.Plan.Publicado === true) {
            this.publicar = this.translate.instant('PLAN_ADQUISICIONES.publicar_nueva_version');
          }
        }
      });

    this.vigenciaPlan = this.Plan.Vigencia;
    // lectura de Datos con fuentes de Recurso para renderizacion
    this.subscription$ = this.store
      .select(getPlanDetallado)
      .subscribe((plan: any) => {
        if (this.sharedService.IfStore(plan)) {
          this.AjustarDatos(plan[0]);
        }
      });
    // Seleccionar Fila Tabla
    this.subscription3$ = this.store
      .select(getFilaSeleccionada)
      .subscribe((accion) => {
        if (this.sharedService.IfStore(accion)) {
          if (accion.accion.name === 'Editar') {
            this.ActualizarRenglon(accion.fila);
          }
        }
      });
    this.sharedService.RetornarAlInicio(
      'planes',
      'pages/plan-adquisiciones/planes/tabla-general'
    );
  }

  AjustarDatos(datos: any) {
    this.translateTableConfiguracion();
    if (datos.length > 0) {
      this.datos = datos;
      this.TotalPlan = this.planesService.SacarTotalPlan(datos);
    }
  }

  private translateTableConfiguracion(): void {
    this.configuracion = this.translateHelper
      .translateItemTableConfiguration(CONFIGURACION_TABLA_DETALLE_PLAN_2);
  }

  CrearRenglon() {
    this.route
      .navigate(['pages/plan-adquisiciones/registro-plan-adquisiciones'])
      .then(() => {
        this.store.dispatch(LoadAccionTabla(null));
        this.store.dispatch(CargarMetasAsociadas(null));
        this.store.dispatch(CargarProductosAsociados(null));
        this.store.dispatch(CargarActividadFuente(null));
        this.DispatchActions();
      });
  }
  ActualizarRenglon(renglon: any) {
    this.route
      .navigate(['pages/plan-adquisiciones/registro-plan-adquisiciones'])
      .then(() => {
        this.store.dispatch(ConsultarRenglonPlan(renglon));
        this.store.dispatch(LoadFilaSeleccionada(null));
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription4$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  OnCancel() {
    this.route.navigate(['pages/plan-adquisiciones/planes/tabla-general']);
  }

  Publicar() {
    this.desactivarPublicar = true;
    this.planesService
      .publicarPlan({
        Id: this.Plan.Id,
        Publicado: true,
      })
      .subscribe((resultado: any) => {
        if (resultado && resultado.Body && resultado.Body.PlanAdquisiciones && resultado.Body.PlanAdquisiciones.IdMongo) {
          this.actualizarPlanAdquisicionesService.creaPlanesdeAdquisicionActivos(
            resultado.Body.PlanAdquisiciones.IdMongo
          );
        }
        if (resultado && resultado.Body && resultado.Body.Movimientos && resultado.Body.Movimientos.length === 0) {
          const messageOptions: any = {
            text: this.translate.instant(
              'PLAN_ADQUISICIONES.sin_cambios'
            ),
            title: this.translate.instant(
              'PLAN_ADQUISICIONES.no_publicado'
            ),
          };
          this.popupService.showInfoAlert(messageOptions.text, messageOptions.title);
        }
        this.desactivarPublicar = false;
      });
  }

  private DispatchActions(): void {
    this.store.dispatch(CargarRubro(null));
    this.store.dispatch(CargarMeta(null));
    this.store.dispatch(CargarProducto(null));
    this.store.dispatch(CargarModalidades(null));
    this.store.dispatch(CargarElementosARKA(null));
    this.store.dispatch(CargarActividades(null));
    this.store.dispatch(SeleccionarResponsable(null));
    this.store.dispatch(CargarRenglonPlan(null));
    this.store.dispatch(SeleccionarFechaSeleccion(null));
    this.store.dispatch(SeleccionarFuente(null));
  }
}
