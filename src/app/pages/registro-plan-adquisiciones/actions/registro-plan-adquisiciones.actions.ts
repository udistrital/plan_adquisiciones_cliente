import { createAction, props } from '@ngrx/store';

export const loadRegistroPlanAdquisicioness = createAction(
  '[RegistroPlanAdquisiciones] Load RegistroPlanAdquisicioness'
);

export const CargarRubro = createAction(
  '[RegistroPlanAdquisiciones] Cargar Rubro',
  props(),
);

export const CargarMeta = createAction(
  '[RegistroPlanAdquisiciones] Cargar Meta',
  props(),
);

export const CargarProducto = createAction(
  '[RegistroPlanAdquisiciones] Cargar Producto',
  props(),
);