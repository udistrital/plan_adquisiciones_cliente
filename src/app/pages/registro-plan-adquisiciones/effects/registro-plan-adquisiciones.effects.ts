import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as RegistroPlanAdquisicionesActions from '../actions/registro-plan-adquisiciones.actions';


@Injectable()
export class RegistroPlanAdquisicionesEffects {


  loadRegistroPlanAdquisicioness$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RegistroPlanAdquisicionesActions.loadRegistroPlanAdquisicioness),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) {}

}
