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

export const CargarModalidades = createAction(
  '[RegistroPlanAdquisiciones] Cargar Modalidades',
  props(),
);

export const CargarElementosARKA = createAction(
  '[RegistroPlanAdquisiciones] Cargar Elementos ARKA',
  props(),
);

export const CargarActividades = createAction(
  '[RegistroPlanAdquisiciones] Cargar Actividades',
  props(),
);

export const SeleccionarActividad = createAction(
  '[RegistroPlanAdquisiciones] Seleccionar Actividad',
  props(),
);

export const CargarFuentes = createAction(
  '[RegistroPlanAdquisiciones] Cargar Fuentes de Financiamiento',
  props(),
);

export const SeleccionarFuente = createAction(
  '[RegistroPlanAdquisiciones] Seleccionar Fuente de Financiamiento',
  props(),
);
