import { createAction, props } from '@ngrx/store';

export const loadShareds = createAction(
  '[Shared] Load Shareds'
);

// Errores

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

// Acciones Arbol

export const GetArbolRubro = createAction(
  '[Shared] Get Arbol Rubro',
  props<{ branch: any }>()
);

export const LoadArbolRubro = createAction(
  '[Shared] Load Arbol Rubro',
  props()
);

// Nodo Seleccionado

export const LoadNodoSeleccionado = createAction(
  '[Shared] Load Nodo Seleccionado',
  props()
);

// Fila Seleccionado

export const LoadFilaSeleccionada = createAction(
  '[Shared] Load Fila Seleccionada',
  props()
);

// Fila Seleccionado

export const LoadAccionTabla = createAction(
  '[Shared] Load Accion Tabla',
  props()
);
