import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from '../reducers/shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);

export const getArbolRubro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ArbolRubro
);