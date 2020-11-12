import { createAction, props } from '@ngrx/store';

export const loadActividadess = createAction(
  '[Actividades] Load Actividadess'
);

export const loadActividadSeleccionada = createAction(
  '[Actividades] Load Actividad Seleccionada',
  props(),
);




