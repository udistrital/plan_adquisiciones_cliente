import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as ActividadesActions from '../actions/actividades.actions';


@Injectable()
export class ActividadesEffects {


  loadActividadess$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ActividadesActions.loadActividadess),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) {}

}
