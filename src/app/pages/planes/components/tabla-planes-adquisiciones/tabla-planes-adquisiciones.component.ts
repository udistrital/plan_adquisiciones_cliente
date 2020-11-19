import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadAccionTabla } from '../../../../shared/actions/shared.actions';
import { getAccionTabla } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-tabla-planes-adquisiciones',
  templateUrl: './tabla-planes-adquisiciones.component.html',
  styleUrls: ['./tabla-planes-adquisiciones.component.scss']
})
export class TablaPlanesAdquisicionesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;

  subscription$: any;

  constructor(
    private store: Store<any>,
    private route: Router,
  ) {
    this.configuracion = CONFIGURACION_PRUEBA;
    this.datosPrueba = DATOS_PRUEBA
    this.store.dispatch(LoadAccionTabla(null));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion) => {
      console.log(accion)
      if (accion) {
        if (Object.keys(accion)[0] !== 'type'){
          this.route.navigate(['pages/plan-adquisiciones/planes/crear-plan-adquisiciones']);
        }
        
      }
    })
  }

}
