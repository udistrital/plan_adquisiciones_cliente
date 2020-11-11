import { createAction, props } from '@ngrx/store';

export const loadLineamientoss = createAction(
  '[Lineamientos] Load Lineamientoss'
);

export const LoadFuenteRecursoSeleccionada = createAction(
  '[Lineamientos] Load Fuente Recurso Seleccionada',
  props()
);

export const LoadLineamientoSeleccionado = createAction(
  '[Lineamientos] Load Lineamiento Seleccionado',
  props()
);



