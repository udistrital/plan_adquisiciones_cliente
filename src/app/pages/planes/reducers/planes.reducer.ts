import { Action, createReducer, on } from '@ngrx/store';
import * as PlanesActions from '../actions/planes.actions';

export const planesFeatureKey = 'planes';

export interface State {

}

export const initialState: State = {

};

const planesReducer = createReducer(
  initialState,

  on(PlanesActions.loadPlaness, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return planesReducer(state, action);
}
