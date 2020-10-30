import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LineamientosEffects } from './lineamientos.effects';

describe('LineamientosEffects', () => {
  let actions$: Observable<any>;
  let effects: LineamientosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LineamientosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<LineamientosEffects>(LineamientosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
