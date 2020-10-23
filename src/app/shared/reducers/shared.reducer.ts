import { Action, createReducer, on } from '@ngrx/store';
import * as SharedActions from '../actions/shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {}

export const initialState: State = {};

const sharedReducer = createReducer(
  initialState,

  on(SharedActions.loadShareds, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return sharedReducer(state, action);
}
