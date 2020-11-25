import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistroPlanAdquisiciones from '../reducers/registro-plan-adquisiciones.reducer';

export const selectRegistroPlanAdquisicionesState = createFeatureSelector<fromRegistroPlanAdquisiciones.State>(
  fromRegistroPlanAdquisiciones.registroPlanAdquisicionesFeatureKey
);
