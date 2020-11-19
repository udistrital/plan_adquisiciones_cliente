import * as fromPlanes from '../reducers/planes.reducer';
import { selectPlanesState } from './planes.selectors';

describe('Planes Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPlanesState({
      [fromPlanes.planesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
