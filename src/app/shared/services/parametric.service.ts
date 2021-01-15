import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetArbolRubro, GetModalidadesSeleccion, GetResponsables } from '../actions/shared.actions';
import { getArbolRubro, getModalidadesSeleccion, getResponsables } from '../selectors/shared.selectors';

@Injectable({
  providedIn: 'root'
})
export class ParametricService {

  constructor(
    private store: Store<any>,
  ) {
  }

  CargarArbolRubros(fuente: any) {
    this.store.select(getArbolRubro).subscribe((arbol: any) => {
      if (Object.keys(arbol).length === 0) {
        this.store.dispatch(GetArbolRubro({ branch: fuente }));
      }
    });
  }

  CargarModalidadesDeSeleccion() {
    this.store.select(getModalidadesSeleccion).subscribe((modalidades: any) => {
      if (!modalidades) {
        this.store.dispatch(GetModalidadesSeleccion({}));
      }
    });
  }

  CargarResponsables() {
    this.store.select(getResponsables).subscribe((responsables: any) => {
      if (!responsables) {
        this.store.dispatch(GetResponsables({}));
      }
    });
  }
}
