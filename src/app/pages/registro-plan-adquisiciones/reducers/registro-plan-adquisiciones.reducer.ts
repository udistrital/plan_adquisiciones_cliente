import { Action, createReducer, on } from '@ngrx/store';
import * as RegistroPlanAdquisicionesActions from '../actions/registro-plan-adquisiciones.actions';

export const registroPlanAdquisicionesFeatureKey = 'registroPlanAdquisiciones';

export interface State {
  Rubro: any;
  Meta: any;
  Producto: any;
  Responsable: any;
  FechaSeleccion: any;
  Modalidades: any;
  ElementosARKA: any;
  Actividades: any;
  ActividadSeleccionada: any;
  Fuentes: any;
  FuenteSeleccionada: any;
  RenglonSeleccionado: any;
  FichaTecnica: any;
  FichaSeleccionada: any;
}

export const initialState: State = {
  Rubro: null,
  Meta: null,
  Producto: null,
  Responsable: null,
  FechaSeleccion: null,
  Modalidades: null,
  ElementosARKA: null,
  Actividades: null,
  ActividadSeleccionada: null,
  Fuentes: null,
  FuenteSeleccionada: null,
  RenglonSeleccionado: null,
  FichaTecnica: null,
  FichaSeleccionada: null,
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
  on(RegistroPlanAdquisicionesActions.CargarActividades, (state, action) => ({
    ...state, Actividades: state.Actividades = action
  })),
  on(RegistroPlanAdquisicionesActions.SeleccionarActividad, (state, action) => ({
    ...state, ActividadSeleccionada: state.ActividadSeleccionada = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarFuentes, (state, action) => ({
    ...state, Fuentes: state.Fuentes = action
  })),
  on(RegistroPlanAdquisicionesActions.SeleccionarFuente, (state, action) => ({
    ...state, FuenteSeleccionada: state.FuenteSeleccionada = action
  })),
  on(RegistroPlanAdquisicionesActions.SeleccionarResponsable, (state, action) => ({
    ...state, Responsable: state.Responsable = action
  })),
  on(RegistroPlanAdquisicionesActions.SeleccionarFechaSeleccion, (state, action) => ({
    ...state, FechaSeleccion: state.FechaSeleccion = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarRenglonPlan, (state, action) => ({
    ...state, RenglonSeleccionado: state.RenglonSeleccionado = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarFichaTecnica, (state, action) => ({
    ...state, FichaTecnica: state.FichaTecnica = action
  })),
  on(RegistroPlanAdquisicionesActions.CargarFichaSeleccionada, (state, action) => ({
    ...state, FichaSeleccionada: state.FichaSeleccionada = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return registroPlanAdquisicionesReducer(state, action);
}
