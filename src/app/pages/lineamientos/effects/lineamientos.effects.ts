import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { combineLatest, EMPTY, of } from 'rxjs';

import * as LineamientosActions from '../actions/lineamientos.actions';
import { LineamientosService } from '../services/lineamientos.service';
import { Store } from '@ngrx/store';
import { getAreaFuncional, getCentroGestor } from '../../../shared/selectors/shared.selectors';
import { getFuenteRecursoSeleccionada } from '../selectors/lineamientos.selectors';


@Injectable()
export class LineamientosEffects {

  subscription$: any;
  AreaFuncional: any;
  CentroGestor: any;
  FuenteRecurso: any;

  constructor(
    private actions$: Actions,
    private lineamientosService: LineamientosService,
    private store: Store<any>,
  ) {

    this.subscription$ = combineLatest([
      this.store.select(getAreaFuncional),
      this.store.select(getCentroGestor),
      this.store.select(getFuenteRecursoSeleccionada),
    ]).subscribe(([area, centro, fuente]) => {
      if (area) {
        this.AreaFuncional = area;
      }
      if (centro) {
        this.CentroGestor = centro;
      }
      if (fuente) {
        this.FuenteRecurso = fuente;
      }
    });

  }

  loadLineamientoss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LineamientosActions.loadLineamientoss),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetLineamientos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LineamientosActions.ConsultarLineamientos),
      mergeMap((opciones: any) =>
        this.lineamientosService.getLineamientosAsociados(
          opciones.CentroGestor,
          opciones.AreaFuncional,
          opciones.FuenteRecurso,
        ).pipe(
          map(data => LineamientosActions.CargarLineamientos([data])),
          catchError(data => of(LineamientosActions.CatchError(data))))
      )
    );
  });

  CrearLineamiento$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LineamientosActions.CrearLineamiento),
      mergeMap((lineamiento: any) =>
        this.lineamientosService.crearLineamiento(
          lineamiento,
        ).pipe(
          map(() => LineamientosActions.ConsultarLineamientos({
            CentroGestor: this.CentroGestor.CentroGestor,
            AreaFuncional: this.AreaFuncional.Id,
            FuenteRecurso: this.FuenteRecurso.Codigo,
          })),
          catchError(data => of(LineamientosActions.CatchError(data))))
      )
    );
  });

  ActualizarLineamiento$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LineamientosActions.ActualizarLineamiento),
      mergeMap((lineamiento: any) =>
        this.lineamientosService.updateLineamiento(
          lineamiento,
        ).pipe(
          map(() => LineamientosActions.ConsultarLineamientos({
            CentroGestor: this.CentroGestor.CentroGestor,
            AreaFuncional: this.AreaFuncional.Id,
            FuenteRecurso: this.FuenteRecurso.Codigo,
          })),
          catchError(data => of(LineamientosActions.CatchError(data))))
      )
    );
  });




}
