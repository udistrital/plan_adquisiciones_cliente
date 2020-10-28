import { Action, createReducer, on } from '@ngrx/store';
import * as SharedActions from '../actions/shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  ArbolRubro: any;
}

export const initialState: State = {
  ArbolRubro: [],
};

const sharedReducer = createReducer(
  initialState,

  on(SharedActions.loadShareds, state => state),
  on(SharedActions.LoadArbolRubro, (state, action) => ({
    ...state, ArbolRubro: state.ArbolRubro = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return sharedReducer(state, action);
}
