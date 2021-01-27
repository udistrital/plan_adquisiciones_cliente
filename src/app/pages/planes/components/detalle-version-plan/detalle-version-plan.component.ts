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
    this.subscription$ = combineLatest([
      this.store.select(getVersionPlan),
      this.store.select(getArbolRubro).pipe(
        map(data => {
          if (Object.keys(data).length !== 0) {
            return data[0].children;
          } else {
            return null;
          }
        }),
      ),
    ]).subscribe(([plan, fuentesRecurso]) => {
      if (this.sharedService.IfStore(plan) && this.sharedService.IfStore(fuentesRecurso)) {
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

    this.configuracion = this.AjustarConfiguracion(datos);
    this.datos = this.planesService.AjustarDatosPlan(datos);
    this.TotalPlan = this.planesService.SacarTotalPlan(datos);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
  AjustarConfiguracion(datos: any) {
    return Object.keys(datos).map((key) => {
      const ajusteConfiguracion = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_DETALLE_PLAN_2));
      ajusteConfiguracion.title.name = datos[key][0].FuenteRecursosNombre;
      ajusteConfiguracion.endSubtotal.items[0].name = 'Total Plan ' + datos[key][0].FuenteRecursosNombre;
      ajusteConfiguracion.rowActions.actions = [
        {
          name: 'Ver',
          icon: 'fas fa-list',
          class: 'p-2',
          title: 'Ver Datos Rubro',
        },
      ];
      delete ajusteConfiguracion.tableActions;
      return ajusteConfiguracion;
    });
  }

}
