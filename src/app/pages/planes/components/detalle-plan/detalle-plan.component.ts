import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadAccionTabla } from '../../../../shared/actions/shared.actions';
import { CargarPlanDetallado} from '../../actions/planes.actions';
import { CONFIGURACION_PRUEBA_2, DATOS_PRUEBA_2 } from '../../interfaces/interfaces';
import { getPlanDetallado } from '../../selectors/planes.selectors';

@Component({
  selector: 'ngx-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.scss']
})
export class DetallePlanComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;

  subscription$: any;
  subscription2$: any;
  subscription3$: any;

  constructor(
    private store: Store<any>,
    private route: Router
  ) {
    this.configuracion = CONFIGURACION_PRUEBA_2;
    this.store.dispatch(LoadAccionTabla(null));
    this.store.dispatch(CargarPlanDetallado([DATOS_PRUEBA_2]));
  }
  ngOnInit() {
    // Cargar plan detallado Asociados
    this.subscription$ = this.store.select(getPlanDetallado).subscribe((plan: any) => {
      if (plan) {
        if (Object.keys(plan).length !== 0) {
          if (Object.keys(plan[0][0]).length !== 0) {
            this.datosPrueba = plan[0];
          } else {
            this.datosPrueba = [];
          }
        }
      }
    });
  }

  OnCancel() {
    this.route.navigate(['pages/plan-adquisiciones/planes/tabla-general']);
  }

}
