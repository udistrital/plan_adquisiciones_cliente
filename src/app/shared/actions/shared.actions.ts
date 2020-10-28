import { createAction, props } from '@ngrx/store';

export const loadShareds = createAction(
  '[Shared] Load Shareds'
);

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

export const GetArbolRubro = createAction(
  '[Shared] Get Arbol Rubro',
  props<{ branch: any }>()
);

export const LoadArbolRubro = createAction(
  '[Shared] Load Arbol Rubro',
  props()
);




