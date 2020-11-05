import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActividades from '../reducers/actividades.reducer';

export const selectActividadesState = createFeatureSelector<fromActividades.State>(
  fromActividades.actividadesFeatureKey
);
