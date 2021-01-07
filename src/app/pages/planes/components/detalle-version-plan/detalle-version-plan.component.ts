import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { getArbolRubro, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_DETALLE_PLAN } from '../../interfaces/interfaces';
import { getVersionPlan } from '../../selectors/planes.selectors';
import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'ngx-detalle-version-plan',
  templateUrl: './detalle-version-plan.component.html',
  styleUrls: ['./detalle-version-plan.component.scss']
})
export class DetalleVersionPlanComponent implements OnInit {

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
  }

  ngOnInit() {
    // lectura de Datos con fuentes de Recurso para renderizacion
    this.subscription$ = this.store.select(getVersionPlan).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.AjustarDatos(plan);
      }
    });

    // Seleccionar Fila Tabla
    this.subscription2$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.name === 'Ver') {
          // this.route.navigate(['pages/registro-plan-adquisiciones-'])
        }
      }
    });
  }

  AjustarDatos(datos: any) {

    const ajusteConfiguracion = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_DETALLE_PLAN));
    ajusteConfiguracion.title.name = datos.descripcion;
    ajusteConfiguracion.rowActions.actions = [
      {
        name: 'Ver',
        icon: 'fas fa-list',
        class: 'p-2',
        title: 'Ver Datos Rubro',
      },
    ]
    delete ajusteConfiguracion.tableActions;
    this.configuracion = ajusteConfiguracion;
    this.datos = (datos.registroplanadquisiciones as Array<any>).map((element: any) => {
      element.RubroId = element.rubroid,
        element.FechaEstimada = {
          start: new Date(element.fechaestimadainicio),
          end: new Date(element.fechaestimadafin),
        },
        element.ResponsableId = element.responsableid;
      return element;
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

}
