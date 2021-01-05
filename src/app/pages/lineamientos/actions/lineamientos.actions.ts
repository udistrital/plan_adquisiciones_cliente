import { createAction, props } from '@ngrx/store';

export const loadLineamientoss = createAction(
  '[Lineamientos] Load Lineamientoss'
);

export const CatchError = createAction(
  '[Lineamientos] Catch Error',
  props<{}>()
);

export const LoadFuenteRecursoSeleccionada = createAction(
  '[Lineamientos] Load Fuente Recurso Seleccionada',
  props()
);

export const SeleccionarLineamiento = createAction(
  '[Lineamientos] Seleccionar Lineamiento',
  props()
);

export const CargarLineamientos = createAction(
  '[Lineamientos] Cargar Lineamientos',
  props()
);

export const ConsultarLineamiento = createAction(
  '[Lineamientos] Consultar Lineamiento',
  props()
);

export const ConsultarLineamientos = createAction(
  '[Lineamientos] Consultar Lineamientos',
  props()
);

export const CrearLineamiento = createAction(
  '[Lineamientos] Crear Lineamiento',
  props()
);

export const ActualizarLineamiento = createAction(
  '[Lineamientos] Actualizar Lineamiento',
  props()
);



