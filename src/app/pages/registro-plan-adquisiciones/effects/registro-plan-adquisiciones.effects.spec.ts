import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RegistroPlanAdquisicionesEffects } from './registro-plan-adquisiciones.effects';

describe('RegistroPlanAdquisicionesEffects', () => {
  let actions$: Observable<any>;
  let effects: RegistroPlanAdquisicionesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegistroPlanAdquisicionesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<RegistroPlanAdquisicionesEffects>(RegistroPlanAdquisicionesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
