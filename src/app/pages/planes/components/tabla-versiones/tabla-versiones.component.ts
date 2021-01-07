import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { ConsultarVersion } from '../../actions/planes.actions';
import { CONFIGURACION_TABLA_VERSIONES_PLAN } from '../../interfaces/interfaces';
import { getPlanSeleccionado, getVersionesPlan } from '../../selectors/planes.selectors';

@Component({
  selector: 'ngx-tabla-versiones',
  templateUrl: './tabla-versiones.component.html',
  styleUrls: ['./tabla-versiones.component.scss']
})
export class TablaVersionesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  subscription2$: any;
  constructor(
    private route: Router,
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    this.configuracion = CONFIGURACION_TABLA_VERSIONES_PLAN;
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((accion: any) => {
      if (this.sharedService.IfStore(accion)) {
        console.log(accion);
        if (accion.accion.title === 'Ver Plan de Adquisiciones') {
          this.store.dispatch(ConsultarVersion(accion.fila));
          this.store.dispatch(LoadFilaSeleccionada(null));
          this.route.navigate(['pages/plan-adquisiciones/planes/detalle-version-plan-adquisiciones']);
        }
      }
    });
    this.subscription2$ = combineLatest([
      this.store.select(getVersionesPlan),
      this.store.select(getPlanSeleccionado)
    ]).subscribe(([accion, plan]) => {
      if (this.sharedService.IfStore(accion) && this.sharedService.IfStore(plan)) {
        this.configuracion.title = {
          name: plan.Descripcion,
          class: 'text-center text-light',
        };
        this.datosPrueba = (accion[0] as Array<any>).map((element: any, index) => {
          return {
            _id: element._id,
            id: element.id,
            index: index,
          };
        });
      } else {
        this.datosPrueba = [];
      }
    });

  }
}
