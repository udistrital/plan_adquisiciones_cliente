import { Action, createReducer, on } from '@ngrx/store';
import * as LineamientosActions from '../actions/lineamientos.actions';

export const lineamientosFeatureKey = 'lineamientos';

export interface State {
  FuenteRecursoSeleccionada: any;
  LineamientoSeleccionado: any;
}

export const initialState: State = {
  FuenteRecursoSeleccionada: null,
  LineamientoSeleccionado: null,
};

const lineamientosReducer = createReducer(
  initialState,

  on(LineamientosActions.loadLineamientoss, state => state),
  on(LineamientosActions.LoadFuenteRecursoSeleccionada, (state, action) => ({
    ...state, FuenteRecursoSeleccionada: state.FuenteRecursoSeleccionada = action
  })),
  on(LineamientosActions.LoadLineamientoSeleccionado, (state, action) => ({
    ...state, LineamientoSeleccionado: state.LineamientoSeleccionado = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return lineamientosReducer(state, action);
}
