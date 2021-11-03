import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { GetArbolRubro, GetModalidadesSeleccion, GetResponsables, GetVigenciaActual } from '../actions/shared.actions';
import { getArbolRubro, getModalidadesSeleccion, getResponsables, getVigenciaActual } from '../selectors/shared.selectors';

@Injectable({
  providedIn: 'root'
})
export class ParametricService {

  subscription$: any;

  constructor(
    private store: Store<any>,
  ) {
    this.store.dispatch(GetVigenciaActual({ offset: null }));
  }

  CargarArbolRubros(fuente: any) {
    this.subscription$ = combineLatest([
      this.store.select(getArbolRubro),
      this.store.select(getVigenciaActual),
    ]).subscribe(([arbol, vigencia]) => {
      if (Object.keys(arbol).length === 0 && vigencia) {
        this.store.dispatch(GetArbolRubro({ branch: fuente, validity: vigencia }));
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
