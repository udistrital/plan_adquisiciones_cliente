import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistroPlanAdquisiciones from '../reducers/registro-plan-adquisiciones.reducer';

export const selectRegistroPlanAdquisicionesState = createFeatureSelector<fromRegistroPlanAdquisiciones.State>(
  fromRegistroPlanAdquisiciones.registroPlanAdquisicionesFeatureKey
);

export const getMeta = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Meta
);

export const getRubro = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Rubro
);

export const getProducto = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Producto
);

export const getModalidades = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Modalidades
);
