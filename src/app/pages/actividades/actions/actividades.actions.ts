import { createAction, props } from '@ngrx/store';

export const loadActividadess = createAction(
  '[Actividades] Load Actividadess'
);

export const CatchError = createAction(
  '[Actividades] Catch Error',
  props()
);

export const SeleccionarActividad = createAction(
  '[Actividades] Seleccionar Actividad',
  props()
);

export const CargarActividades = createAction(
  '[Actividades] Cargar Actividades',
  props()
);

export const ConsultarActividades = createAction(
  '[Actividades] Consultar Actividades',
  props()
);

export const CrearActividad = createAction(
  '[Actividades] Crear Actividad',
  props()
);

export const ActualizarActividad = createAction(
  '[Actividades] Actualizar Actividad',
  props()
);




