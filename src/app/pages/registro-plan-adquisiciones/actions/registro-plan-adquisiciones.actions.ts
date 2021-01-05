import { createAction, props } from '@ngrx/store';

export const loadRegistroPlanAdquisicioness = createAction(
  '[RegistroPlanAdquisiciones] Load RegistroPlanAdquisicioness'
);


export const CatchError = createAction(
  '[RegistroPlanAdquisiciones] Catch Error',
  props()
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

export const SeleccionarResponsable = createAction(
  '[RegistroPlanAdquisiciones] Seleccionar Responsable',
  props(),
);

export const SeleccionarFechaSeleccion = createAction(
  '[RegistroPlanAdquisiciones] Seleccionar Fechas de Seleccion',
  props(),
);

export const ConsultarRenglonPlan = createAction(
  '[RegistroPlanAdquisiciones] Consultar Renglon Plan Adquisiciones',
  props(),
);

export const CargarRenglonPlan = createAction(
  '[RegistroPlanAdquisiciones] Cargar Renglon Plan Adquisiciones',
  props(),
);

export const CrearRenglonPlan = createAction(
  '[RegistroPlanAdquisiciones] Crear Renglon Plan Adquisiciones',
  props(),
);

export const ActualizarRenglonPlan = createAction(
  '[RegistroPlanAdquisiciones] Actualizar Renglon Plan Adquisiciones',
  props(),
);
