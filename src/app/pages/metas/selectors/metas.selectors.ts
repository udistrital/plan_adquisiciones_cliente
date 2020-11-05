import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMetas from '../reducers/metas.reducer';

export const selectMetasState = createFeatureSelector<fromMetas.State>(
  fromMetas.metasFeatureKey
);
