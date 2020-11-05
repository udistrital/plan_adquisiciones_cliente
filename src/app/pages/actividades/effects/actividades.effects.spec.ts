import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActividadesEffects } from './actividades.effects';

describe('ActividadesEffects', () => {
  let actions$: Observable<any>;
  let effects: ActividadesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActividadesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ActividadesEffects>(ActividadesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
