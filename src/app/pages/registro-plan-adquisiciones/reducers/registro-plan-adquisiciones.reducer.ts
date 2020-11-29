import { Action, createReducer, on } from '@ngrx/store';
import * as RegistroPlanAdquisicionesActions from '../actions/registro-plan-adquisiciones.actions';

export const registroPlanAdquisicionesFeatureKey = 'registroPlanAdquisiciones';

export interface State {
  Rubro: any;
  Meta: any;
  Producto: any;
  Modalidades: any;
  ElementosARKA: any;
}

export const initialState: State = {
  Rubro: null,
  Meta: null,
  Producto: null,
  Modalidades: null,
  ElementosARKA: null,
};

const registroPlanAdquisicionesReducer = createReducer(
  initialState,

  on(RegistroPlanAdquisicionesActions.loadRegistroPlanAdquisicioness, state => state),
  on(RegistroPlanAdquisicionesActions.CargarRubro, (state, action) => ({
    ...state, Rubro: state.Rubro = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarMeta, (state, action) => ({
    ...state, Meta: state.Meta = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarProducto, (state, action) => ({
    ...state, Producto: state.Producto = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarModalidades, (state, action) => ({
    ...state, Modalidades: state.Modalidades = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarElementosARKA, (state, action) => ({
    ...state, ElementosARKA: state.ElementosARKA = action
  })),


);

export function reducer(state: State | undefined, action: Action) {
  return registroPlanAdquisicionesReducer(state, action);
}
