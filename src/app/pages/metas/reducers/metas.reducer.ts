import { Action, createReducer, on } from '@ngrx/store';
import * as MetasActions from '../actions/metas.actions';

export const metasFeatureKey = 'metas';

export interface State {
  MetaSeleccionada: any;
}

export const initialState: State = {
  MetaSeleccionada: null
};

const metasReducer = createReducer(
  initialState,

  on(MetasActions.loadMetass, state => state),
  on(MetasActions.loadMetaSeleccionada, (state, action) => ({
    ...state, MetaSeleccionada: state.MetaSeleccionada = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return metasReducer(state, action);
}
