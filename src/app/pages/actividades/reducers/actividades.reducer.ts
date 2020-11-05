import { Action, createReducer, on } from '@ngrx/store';
import * as ActividadesActions from '../actions/actividades.actions';

export const actividadesFeatureKey = 'actividades';

export interface State {
  ActividadSeleccionada: any,
}

export const initialState: State = {
  ActividadSeleccionada: null,
};

const actividadesReducer = createReducer(
  initialState,

  on(ActividadesActions.loadActividadess, state => state),
  on(ActividadesActions.loadActividadSeleccionada, (state, action) => ({
    ...state, ActividadSeleccionada: state.ActividadSeleccionada = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return actividadesReducer(state, action);
}
