import { Action, createReducer, on } from '@ngrx/store';
import * as ActividadesActions from '../actions/actividades.actions';

export const actividadesFeatureKey = 'actividades';

export interface State {

}

export const initialState: State = {

};

const actividadesReducer = createReducer(
  initialState,

  on(ActividadesActions.loadActividadess, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return actividadesReducer(state, action);
}
