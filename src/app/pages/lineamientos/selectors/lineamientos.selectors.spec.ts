import * as fromLineamientos from '../reducers/lineamientos.reducer';
import { selectLineamientosState } from './lineamientos.selectors';

describe('Lineamientos Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLineamientosState({
      [fromLineamientos.lineamientosFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
