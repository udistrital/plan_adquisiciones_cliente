import { createAction, props } from '@ngrx/store';

export const loadPlaness = createAction(
  '[Planes] Load Planess'
);

export const CatchError = createAction(
  '[Planes] Catch Error',
  props()
);

export const SeleccionarPlan = createAction(
  '[Planes] Seleccionar Plan',
  props()
);

export const CargarPlanes = createAction(
  '[Planes] Cargar Planes',
  props()
);

export const ConsultarPlanes = createAction(
  '[Planes] Consultar Planes',
  props()
);

export const ConsultarPlan = createAction(
  '[Planes] Consultar Plan',
  props()
);

export const CrearPlan = createAction(
  '[Planes] Crear Plan',
  props()
);

export const ActualizarPlan = createAction(
  '[Planes] Actualizar Plan',
  props()
);

export const ConsultarPlanDetallado = createAction(
  '[Planes] Consultar Plan Detallado',
  props()
);

export const CargarPlanDetallado = createAction(
  '[Planes] Cargar Plan Detallado',
  props()
);

