import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SharedActions from '../actions/shared.actions';
import { SharedService } from '../services/shared.service';


@Injectable()
export class SharedEffects {

  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
  ) { }


  loadShareds$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SharedActions.loadShareds),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetArbolRubro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetArbolRubro),
      mergeMap((branch) =>
        this.sharedService.getArbol(branch.branch)
          .pipe(
            map(data => SharedActions.LoadArbolRubro(data)),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });

  GetVigenciaActual$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetVigenciaActual),
      mergeMap((offset) =>
        this.sharedService.getVigenciaActual(offset.offset)
          .pipe(
            map(data => SharedActions.LoadVigenciaActual(data)),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });

  GetModalidadesSeleccion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetModalidadesSeleccion),
      mergeMap(() =>
        this.sharedService.getModalidadesDeSeleccion()
          .pipe(
            map(data => SharedActions.LoadModalidadesSeleccion([data])),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });
}
