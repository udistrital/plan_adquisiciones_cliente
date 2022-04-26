import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistroPlanAdquisiciones from '../reducers/registro-plan-adquisiciones.reducer';

export const selectRegistroPlanAdquisicionesState = createFeatureSelector<fromRegistroPlanAdquisiciones.State>(
  fromRegistroPlanAdquisiciones.registroPlanAdquisicionesFeatureKey
);

export const getMeta = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Meta
);

export const getRubro = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Rubro
);

export const getProducto = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Producto
);

export const getModalidades = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Modalidades
);

export const getElementosARKA = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.ElementosARKA
);

export const getActividades = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Actividades
);

export const getActividadSeleccionada = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.ActividadSeleccionada
);

export const getFuentes = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.Fuentes
);

export const getFuenteSeleccionada = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.FuenteSeleccionada
);

export const getRenglonSeleccionado = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.RenglonSeleccionado
);

export const getFichaTecnica = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.FichaTecnica
);

export const getFichaSeleccionada = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.FichaSeleccionada
);

export const getMetasAsociadas = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.MetasAsociadas
);

export const getProductosAsociados = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.ProductosAsociados
);

export const getActividadFuente = createSelector(
  selectRegistroPlanAdquisicionesState,
  (state: fromRegistroPlanAdquisiciones.State) => state.ActividadFuente
);


