import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ActividadesActions from '../actions/actividades.actions';
import { ActividadesService } from '../services/actividades.service';
import { Store } from '@ngrx/store';
import { getMetaSeleccionada } from '../../metas/selectors/metas.selectors';


@Injectable()
export class ActividadesEffects {
  
  subscription$: any;
  Meta: any;

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private actividadesService: ActividadesService,
  ) {
    this.subscription$ = this.store.select(getMetaSeleccionada).subscribe((meta) => {
      if (meta) {
        this.Meta = meta
      }
    })
  }

  loadActividadess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ActividadesActions.loadActividadess),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetActividades$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActividadesActions.ConsultarActividades),
      mergeMap((opciones: any) =>
        this.actividadesService.getActividadesAsociadas(
          opciones.Actividad.Id,
        ).pipe(
          map(data => ActividadesActions.CargarActividades([data])),
          catchError(data => of(ActividadesActions.CatchError(data))))
      )
    );
  });

  CrearActividad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActividadesActions.CrearActividad),
      mergeMap((Actividad: any) =>
        this.actividadesService.crearActividad(
          Actividad,
        ).pipe(
          map((data) => ActividadesActions.SeleccionarActividad(
            data
          )),
          map(() => ActividadesActions.ConsultarActividades({
            Meta: this.Meta,
          })),
          catchError(data => of(ActividadesActions.CatchError(data))))
      )
    );
  });

  ActualizarActividad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActividadesActions.ActualizarActividad),
      mergeMap((Actividad: any) =>
        this.actividadesService.updateActividad(
          Actividad,
        ).pipe(
          map((data) => ActividadesActions.SeleccionarActividad(
            data
          )),
          map(() => ActividadesActions.ConsultarActividades({
            Meta: this.Meta,
          })),
          catchError(data => of(ActividadesActions.CatchError(data))))
      )
    );
  });



}
