import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getArbolRubro, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_PRUEBA_2 } from '../../interfaces/interfaces';
import { getPlanDetallado } from '../../selectors/planes.selectors';

@Component({
  selector: 'ngx-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.scss']
})
export class DetallePlanComponent implements OnInit, OnDestroy {

  configuracion: any[];
  configTotal: any;
  datos: any[];

  subscription$: any;
  subscription2$: any;
  subscription3$: any;


  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
    private parametrics: ParametricService,
  ) {
    this.parametrics.CargarArbolRubros('3');

    // this.datosPrueba = [];
    // this.configuracion = [
    //   JSON.parse(JSON.stringify(CONFIGURACION_PRUEBA_2)),
    //   JSON.parse(JSON.stringify(CONFIGURACION_PRUEBA_2)),
    // ];

    // this.configuracion[0].title.name = 'Plan Funcionamiento 2020';
    // this.configuracion[1].title.name = 'Plan Inversion 2020';

    // this.configuracion[0].subtitle.name = 'Rubro Compra de Equipo';
    // this.configuracion[1].subtitle.name = '378 - Promocion del Desarrollo y la investigacion del Desarrollo Cientifico';

    // this.configuracion[0].endSubtotal.items[0].name = 'Total Rubro Compra de Equipo';
    // this.configuracion[1].endSubtotal.items[0].name = 'Total Rubro 378 - Promocion del Desarrollo y la investigacion del Desarrollo Cientifico';

    // this.store.dispatch(LoadAccionTabla(null));
    // this.store.dispatch(CargarPlanDetallado([DATOS_PRUEBA_2]));
  }

  ngOnInit() {

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
        this.AjustarDatos(plan[0], fuentesRecurso);
      } else {
        this.datos = [];
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
          this.route.navigate(['pages/plan-adquisiciones/registro-plan-adquisiciones']);
          this.store.dispatch(LoadFilaSeleccionada(null));
        }
      }
    });
  }


  AjustarDatos(datos: any, fuentesRecurso: any) {

    this.configuracion = [];
    this.datos = [];
    const llavesAjustadas = [];

    Object.keys(datos).forEach((key: any, index: any) => {

      // Monto los Datos
      this.datos.push(datos[key]);
      // ajusto la llave para coincidir con las fuentes de recurso
      const llave = key.split(' ')[1];
      llavesAjustadas.push(llave.substring(0, 1) + '-' + llave.substring(1, 3));

      // Organizo la configuracion de la tabla
      const ajusteConfiguracion = JSON.parse(JSON.stringify(CONFIGURACION_PRUEBA_2));
      ajusteConfiguracion.title.name = fuentesRecurso.find(
        (fuente: any) => fuente.Codigo === llavesAjustadas[index]
      ).data.Nombre;
      ajusteConfiguracion.endSubtotal.items[0].name = 'Total Plan ' + ajusteConfiguracion.title.name;
      this.configuracion.push(ajusteConfiguracion);
    });

    this.datos.forEach((element: any) => {
      const fechas: any = {
        start: element.FechaEstimadaInicio,
        end: element.FechaEstimadaFin,
      };
      element.FechaEstimada = fechas;
      element.DuracionEstimada = fechas;
      // element.FuenteRecurso = fuentesRecurso.find((fuente: any) => fuente.Codigo === llavesAjustadas[index]);
    });

  }

  CrearRenglon() {
    this.route.navigate(['pages/plan-adquisiciones/registro-plan-adquisicoines']);
    this.store.dispatch(LoadAccionTabla(null));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  OnCancel() {
    this.route.navigate(['pages/plan-adquisiciones/planes/tabla-general']);
  }

}
