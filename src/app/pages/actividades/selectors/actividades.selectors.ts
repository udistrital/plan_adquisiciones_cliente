import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActividades from '../reducers/actividades.reducer';

export const selectActividadesState = createFeatureSelector<fromActividades.State>(
  fromActividades.actividadesFeatureKey
);

export const getActividadSeleccionada = createSelector(
  selectActividadesState,
  (state: fromActividades.State) => state.ActividadSeleccionada
);