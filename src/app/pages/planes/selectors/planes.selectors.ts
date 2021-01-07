import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPlanes from '../reducers/planes.reducer';

export const selectPlanesState = createFeatureSelector<fromPlanes.State>(
  fromPlanes.planesFeatureKey
);

export const getPlanSeleccionado = createSelector(
  selectPlanesState,
  (state: fromPlanes.State) => state.PlanSeleccionado
);

export const getPlanes = createSelector(
  selectPlanesState,
  (state: fromPlanes.State) => state.Planes
);

export const getPlanDetallado = createSelector(
  selectPlanesState,
  (state: fromPlanes.State) => state.PlanDetallado
);

export const getVersionesPlan = createSelector(
  selectPlanesState,
  (state: fromPlanes.State) => state.Versiones
);

export const getVersionPlan = createSelector(
  selectPlanesState,
  (state: fromPlanes.State) => state.VersionSeleccionada
);
