import { Action, createReducer, on } from '@ngrx/store';
import * as MetasActions from '../actions/metas.actions';

export const metasFeatureKey = 'metas';

export interface State {

}

export const initialState: State = {

};

const metasReducer = createReducer(
  initialState,

  on(MetasActions.loadMetass, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return metasReducer(state, action);
}
