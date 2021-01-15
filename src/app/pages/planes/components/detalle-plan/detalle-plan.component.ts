import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getArbolRubro, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarActividades } from '../../../actividades/actions/actividades.actions';
import {
  CargarElementosARKA,
  CargarMeta,
  CargarModalidades,
  CargarProducto,
  CargarRenglonPlan,
  CargarRubro,
  ConsultarRenglonPlan,
  SeleccionarFechaSeleccion,
  SeleccionarFuente,
  SeleccionarResponsable
} from '../../../registro-plan-adquisiciones/actions/registro-plan-adquisiciones.actions';
import { ConsultarPlanDetallado } from '../../actions/planes.actions';
import { CONFIGURACION_TABLA_DETALLE_PLAN } from '../../interfaces/interfaces';
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
    this.subscription$ = combineLatest([
      this.store.select(getArbolRubro).pipe(
        map(data => {
          if (Object.keys(data).length !== 0) {
            return data[0].children;
          } else {
            return null;
          }
        }),
      ),
      this.store.select(getPlanDetallado),
    ]).subscribe(([fuentesRecurso, plan]) => {
      if (this.sharedService.IfStore(plan) && fuentesRecurso) {
        if (Object.keys(plan[0]).length !== 0) {
          this.AjustarDatos(plan[0], fuentesRecurso);
        } else {
          this.datos = [];
        }
      }
    });
    // Seleccionar Nuevo Plan
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        this.CrearRenglon();
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


  AjustarDatos(datos: any, fuentesRecurso: any) {

    this.configuracion = Object.keys(datos).map((key: any, index: any) => {
      const ajusteConfiguracion = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_DETALLE_PLAN));
      ajusteConfiguracion.title.name = fuentesRecurso.find(
        (fuente: any) => fuente.Codigo === key.split(' ')[1]
      ).data.Nombre;
      return ajusteConfiguracion;
    });
    this.datos = Object.keys(datos).map((key: any) => {
      (datos[key] as Array<any>).map((element: any) => {
        element.FechaEstimada = {
          start: new Date(element.FechaEstimadaInicio),
          end: new Date(element.FechaEstimadaFin),
        };
        return element;
      });
      return datos[key];
    });
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
    this.subscription2$.unsubscribe();
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
