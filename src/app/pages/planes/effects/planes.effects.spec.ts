import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PlanesEffects } from './planes.effects';

describe('PlanesEffects', () => {
  let actions$: Observable<any>;
  let effects: PlanesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<PlanesEffects>(PlanesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
