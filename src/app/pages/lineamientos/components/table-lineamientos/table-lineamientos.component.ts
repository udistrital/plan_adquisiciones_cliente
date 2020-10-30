import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { GetArbolRubro } from '../../../../shared/actions/shared.actions';
import { getArbolRubro } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-lineamientos',
  templateUrl: './table-lineamientos.component.html',
  styleUrls: ['./table-lineamientos.component.scss']
})
export class TableLineamientosComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  fuentesRecurso: any;

  subscription$: any;

  constructor(
    private store: Store<any>,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
    this.store.dispatch(GetArbolRubro({ branch: '3' }));
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getArbolRubro).pipe(
      map(data => {
        if (Object.keys(data).length !== 0) {
          return data[0].children;
        } else {
          return null;
        }
      }),
    ).subscribe((data: any) => {
      // console.log(data);
      this.fuentesRecurso = data;
    });
  }

}
