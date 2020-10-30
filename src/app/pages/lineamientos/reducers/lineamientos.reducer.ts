import { Action, createReducer, on } from '@ngrx/store';
import * as LineamientosActions from '../actions/lineamientos.actions';

export const lineamientosFeatureKey = 'lineamientos';

export interface State {

}

export const initialState: State = {

};

const lineamientosReducer = createReducer(
  initialState,

  on(LineamientosActions.loadLineamientoss, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return lineamientosReducer(state, action);
}
