import { Action, createReducer, on } from '@ngrx/store';
import * as MetasActions from '../actions/metas.actions';

export const metasFeatureKey = 'metas';

export interface State {
  RubroSeleccionado: any;
  MetaSeleccionada: any;
  Metas: any;
}

export const initialState: State = {
  RubroSeleccionado: null,
  MetaSeleccionada: null,
  Metas: []
};

const metasReducer = createReducer(
  initialState,

  on(MetasActions.loadMetass, state => state),
  on(MetasActions.SeleccionarRubro, (state, action) => ({
    ...state, RubroSeleccionado: state.RubroSeleccionado = action
  })),
  on(MetasActions.SeleccionarMeta, (state, action) => ({
    ...state, MetaSeleccionada: state.MetaSeleccionada = action
  })),
  on(MetasActions.CargarMetas, (state, action) => ({
    ...state, Metas: state.Metas = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return metasReducer(state, action);
}
