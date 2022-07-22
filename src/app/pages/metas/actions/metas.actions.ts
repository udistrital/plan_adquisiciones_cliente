import { createAction, props } from '@ngrx/store';

export const loadMetass = createAction(
  '[Metas] Load Metass'
);

export const CatchError = createAction(
  '[Metas] Catch Error',
  props()
);

export const SeleccionarRubro = createAction(
  '[Metas] Seleccionar Rubro',
  props()
);

export const SeleccionarMeta = createAction(
  '[Metas] Seleccionar Meta',
  props()
);

export const SeleccionarDeactivateForm = createAction(
  '[Metas] Seleccionar DeactivateForm',
  props()
);

export const CargarMetas = createAction(
  '[Metas] Cargar Metas',
  props()
);

export const ConsultarMetas = createAction(
  '[Metas] Consultar Metas',
  props()
);

export const ConsultarMeta = createAction(
  '[Metas] Consultar Meta',
  props()
);

export const CrearMeta = createAction(
  '[Metas] Crear Meta',
  props()
);

export const ActualizarMeta = createAction(
  '[Metas] Actualizar Meta',
  props()
);

export const ChangeDeactivateForm = createAction(
  '[Metas] Actualizar DeactivateForm',
  props()
);
