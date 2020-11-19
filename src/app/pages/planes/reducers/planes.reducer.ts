import { Action, createReducer, on } from '@ngrx/store';
import * as PlanesActions from '../actions/planes.actions';

export const planesFeatureKey = 'planes';

export interface State {
  Planes: any;
  PlanSeleccionado: any;
}

export const initialState: State = {
  Planes: [],
  PlanSeleccionado: null,
};

const planesReducer = createReducer(
  initialState,

  on(PlanesActions.loadPlaness, state => state),
  on(PlanesActions.SeleccionarPlan, (state, action) => ({
    ...state, PlanSeleccionado: state.PlanSeleccionado = action
  })),
  on(PlanesActions.CargarPlanes, (state, action) => ({
    ...state, Planes: state.Planes = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return planesReducer(state, action);
}
