import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPlanes from '../reducers/planes.reducer';

export const selectPlanesState = createFeatureSelector<fromPlanes.State>(
  fromPlanes.planesFeatureKey
);
