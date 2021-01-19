import * as fromActividades from '../reducers/actividades.reducer';
import { selectActividadesState } from './actividades.selectors';

describe('Actividades Selectors', () => {
  it('should select the feature state', () => {
    const result = selectActividadesState({
      [fromActividades.actividadesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
