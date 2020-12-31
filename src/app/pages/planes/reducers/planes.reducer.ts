import { Action, createReducer, on } from '@ngrx/store';
import * as PlanesActions from '../actions/planes.actions';

export const planesFeatureKey = 'planes';

export interface State {
  Planes: any;
  PlanSeleccionado: any;
  PlanDetallado: any;
}

export const initialState: State = {
  Planes: null,
  PlanSeleccionado: null,
  PlanDetallado: null,
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
  on(PlanesActions.CargarPlanDetallado, (state, action) => ({
    ...state, PlanDetallado: state.PlanDetallado = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return planesReducer(state, action);
}
