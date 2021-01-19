import { Action, createReducer, on } from '@ngrx/store';
import * as PlanesActions from '../actions/planes.actions';

export const planesFeatureKey = 'planes';

export interface State {
  Planes: any;
  PlanSeleccionado: any;
  PlanDetallado: any;
  Versiones: any;
  VersionSeleccionada: any;
  RenglonVersion: any;
}

export const initialState: State = {
  Planes: null,
  PlanSeleccionado: null,
  PlanDetallado: null,
  Versiones: null,
  VersionSeleccionada: null,
  RenglonVersion: null,
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
  on(PlanesActions.CargarVersionesPlan, (state, action) => ({
    ...state, Versiones: state.Versiones = action
  })),
  on(PlanesActions.CargarVersion, (state, action) => ({
    ...state, VersionSeleccionada: state.VersionSeleccionada = action
  })),
  on(PlanesActions.CargarRenglonVersion, (state, action) => ({
    ...state, RenglonVersion: state.RenglonVersion = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return planesReducer(state, action);
}
