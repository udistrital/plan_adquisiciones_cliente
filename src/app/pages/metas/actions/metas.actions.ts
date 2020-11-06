import { createAction, props } from '@ngrx/store';

export const loadMetass = createAction(
  '[Metas] Load Metass'
);

export const loadMetaSeleccionada = createAction(
  '[Metas] Load Meta Seleccionada',
  props(),
);



