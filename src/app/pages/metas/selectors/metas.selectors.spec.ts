import * as fromMetas from '../reducers/metas.reducer';
import { selectMetasState } from './metas.selectors';

describe('Metas Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMetasState({
      [fromMetas.metasFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
