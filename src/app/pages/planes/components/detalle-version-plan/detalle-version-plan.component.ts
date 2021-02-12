import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getArbolRubro, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarRenglonVersion } from '../../actions/planes.actions';
import { CONFIGURACION_TABLA_DETALLE_PLAN_2 } from '../../interfaces/interfaces';
import { getVersionPlan } from '../../selectors/planes.selectors';
import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'ngx-detalle-version-plan',
  templateUrl: './detalle-version-plan.component.html',
  styleUrls: ['./detalle-version-plan.component.scss']
})
export class DetalleVersionPlanComponent implements OnInit, OnDestroy {

  configuracion: any[];
  configTotal: any;
  datos: any[];
  publicar: any;

  subscription$: any;
  subscription2$: any;
  Plan: any;
  TotalPlan: any;


  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
    private planesService: PlanesService,
  ) {
  }

  ngOnInit() {
    // lectura de Datos con fuentes de Recurso para renderizacion
    this.subscription$ = this.store.select(getVersionPlan).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.AjustarDatos(plan['registroplanadquisiciones']);
      }
    });

    // Seleccionar Fila Tabla
    this.subscription2$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.name === 'Ver') {
          this.store.dispatch(LoadFilaSeleccionada(null));
          this.store.dispatch(CargarRenglonVersion(accion.fila));
          this.route.navigate(['pages/plan-adquisiciones/detalle-version-plan-adquisiciones']);
        }
      }
    });
    this.sharedService.RetornarAlInicio('planes', 'pages/plan-adquisiciones/planes/tabla-general');
  }

  AjustarDatos(datos: any) {
    console.log(datos)
    const conf = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_DETALLE_PLAN_2))
    conf.rowActions.actions = [
      {
        name: 'Ver',
        icon: 'fas fa-list',
        class: 'p-2',
        title: 'Ver Version',
      },
    ]
    this.configuracion = conf;
    this.datos = datos
    this.TotalPlan = this.planesService.SacarTotalPlan(datos);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
}
