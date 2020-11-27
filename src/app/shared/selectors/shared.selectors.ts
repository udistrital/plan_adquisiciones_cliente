import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from '../reducers/shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);

export const getArbolRubro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ArbolRubro
);

export const getNodoSeleccionado = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.NodoSeleccionado
);

export const getFilaSeleccionada = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.FilaSeleccionada
);

export const getAccionTabla = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.AccionTabla
);

export const getVigenciaActual = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.VigenciaActual
);

export const getAreaFuncional = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.AreaFuncional
);

export const getCentroGestor = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.CentroGestor
);

export const getModalidadesSeleccion = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ModalidadesSeleccion
);

