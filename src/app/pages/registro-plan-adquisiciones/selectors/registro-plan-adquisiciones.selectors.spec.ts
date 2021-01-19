import * as fromRegistroPlanAdquisiciones from '../reducers/registro-plan-adquisiciones.reducer';
import { selectRegistroPlanAdquisicionesState } from './registro-plan-adquisiciones.selectors';

describe('RegistroPlanAdquisiciones Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRegistroPlanAdquisicionesState({
      [fromRegistroPlanAdquisiciones.registroPlanAdquisicionesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
