import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as MetasActions from '../actions/metas.actions';


@Injectable()
export class MetasEffects {


  loadMetass$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MetasActions.loadMetass),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) { }

}
