import { Action, createReducer, on } from '@ngrx/store';
import * as ActividadesActions from '../actions/actividades.actions';

export const actividadesFeatureKey = 'actividades';

export interface State {
  ActividadSeleccionada: any;
  Actividades: any;
}

export const initialState: State = {
  ActividadSeleccionada: null,
  Actividades: [],
};

const actividadesReducer = createReducer(
  initialState,

  on(ActividadesActions.loadActividadess, state => state),
  on(ActividadesActions.SeleccionarActividad, (state, action) => ({
    ...state, ActividadSeleccionada: state.ActividadSeleccionada = action
  })),
  on(ActividadesActions.CargarActividades, (state, action) => ({
    ...state, Actividades: state.Actividades = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return actividadesReducer(state, action);
}
