import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMetas from '../reducers/metas.reducer';

export const selectMetasState = createFeatureSelector<fromMetas.State>(
  fromMetas.metasFeatureKey
);
export const getMetaSeleccionada = createSelector(
  selectMetasState,
  (state: fromMetas.State) => state.MetaSeleccionada
);

export const getRubroSeleccionado = createSelector(
  selectMetasState,
  (state: fromMetas.State) => state.RubroSeleccionado
);

export const getMetas = createSelector(
  selectMetasState,
  (state: fromMetas.State) => state.Metas
);
