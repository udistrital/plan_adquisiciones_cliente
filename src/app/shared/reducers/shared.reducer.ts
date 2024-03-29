import { Action, createReducer, on } from '@ngrx/store';
import * as SharedActions from '../actions/shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  ArbolRubro: any;
  NodoSeleccionado: any;
  FilaSeleccionada: any;
  AccionTabla: any;
  VigenciaActual: any;
  AreaFuncional: any;
  CentroGestor: any;
  ModalidadesSeleccion: any;
  Responsables: any;
}

export const initialState: State = {
  ArbolRubro: [],
  NodoSeleccionado: null,
  FilaSeleccionada: null,
  AccionTabla: null,
  VigenciaActual: null,
  AreaFuncional: {
    Id: 1, // !TODO: Parametrizable
    Nombre: 'Rector', // !TODO: Parametrizable
    label: '01 - Rector', // !TODO: Parametrizable
  },
  CentroGestor: {
    CentroGestor: 230, // !TODO: Parametrizable
  },
  ModalidadesSeleccion: null,
  Responsables: null,
};

const sharedReducer = createReducer(
  initialState,

  on(SharedActions.loadShareds, state => state),
  on(SharedActions.LoadArbolRubro, (state, action) => ({
    ...state, ArbolRubro: state.ArbolRubro = action
  })),
  on(SharedActions.LoadNodoSeleccionado, (state, action) => ({
    ...state, NodoSeleccionado: state.NodoSeleccionado = action
  })),
  on(SharedActions.LoadFilaSeleccionada, (state, action) => ({
    ...state, FilaSeleccionada: state.FilaSeleccionada = action
  })),
  on(SharedActions.LoadAccionTabla, (state, action) => ({
    ...state, AccionTabla: state.AccionTabla = action
  })),
  on(SharedActions.LoadVigenciaActual, (state, action) => ({
    ...state, VigenciaActual: state.VigenciaActual = action
  })),
  on(SharedActions.LoadAreaFuncional, (state, action) => ({
    ...state, AreaFuncional: state.AreaFuncional = action
  })),
  on(SharedActions.LoadCentroGestor, (state, action) => ({
    ...state, CentroGestor: state.CentroGestor = action
  })),
  on(SharedActions.LoadModalidadesSeleccion, (state, action) => ({
    ...state, ModalidadesSeleccion: state.ModalidadesSeleccion = action
  })),
  on(SharedActions.LoadResponsables, (state, action) => ({
    ...state, Responsables: state.Responsables = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return sharedReducer(state, action);
}
