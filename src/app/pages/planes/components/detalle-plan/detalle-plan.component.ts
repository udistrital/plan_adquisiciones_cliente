import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getArbolRubro, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
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
  SeleccionarResponsable
} from '../../../registro-plan-adquisiciones/actions/registro-plan-adquisiciones.actions';
import { ConsultarPlanDetallado } from '../../actions/planes.actions';
import { CONFIGURACION_TABLA_DETALLE_PLAN_2 } from '../../interfaces/interfaces';
import { getPlanDetallado, getPlanSeleccionado } from '../../selectors/planes.selectors';
import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'ngx-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.scss']
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


  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
    private planesService: PlanesService,
    private popupService: PopUpManager,
  ) {
    // this.parametrics.CargarArbolRubros('3');
    this.publicar = 'Publicar Plan de Adquisiciones';
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

  ngOnInit() {

    this.subscription4$ = this.store.select(getPlanSeleccionado).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.Plan = plan;
        this.store.dispatch(ConsultarPlanDetallado(plan));
        if (this.Plan.Publicado === true) {
          this.publicar = 'Publicar Nueva Version del Plan de Adquisiciones';
        }

      }
    });
    // lectura de Datos con fuentes de Recurso para renderizacion
    this.subscription$ = this.store.select(getPlanDetallado).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.AjustarDatos(plan[0]);
      }
    });
    // Seleccionar Fila Tabla
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.name === 'Editar') {

          this.ActualizarRenglon(accion.fila);
        }
      }
    });
    this.sharedService.RetornarAlInicio('planes', 'pages/plan-adquisiciones/planes/tabla-general');
  }


  AjustarDatos(datos: any) {
    this.configuracion = CONFIGURACION_TABLA_DETALLE_PLAN_2;
    if (Object.keys(datos[0]).length !== 0) {
      this.datos = datos;
      this.TotalPlan = this.planesService.SacarTotalPlan(datos);
    }
  }

  CrearRenglon() {
    this.route.navigate(['pages/plan-adquisiciones/registro-plan-adquisiciones']).then(() => {
      this.store.dispatch(LoadAccionTabla(null));
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
    });
  }
  ActualizarRenglon(renglon: any) {
    this.route.navigate(['pages/plan-adquisiciones/registro-plan-adquisiciones']).then(() => {
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
    this.planesService.publicarPlan({
      Id: this.Plan.Id,
      Publicado: true,
    }).subscribe((resultado: any) => {

      this.popupService.showSuccessAlert(
        'Plan de Adquisiciones publicado',
        'Publicado',
      );
    });
  }

}
