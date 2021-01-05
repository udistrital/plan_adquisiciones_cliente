import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MetasEffects } from './metas.effects';

describe('MetasEffects', () => {
  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: MetasEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetasEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<MetasEffects>(MetasEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
