import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { combineLatest, EMPTY, of } from 'rxjs';

import * as MetasActions from '../actions/metas.actions';
import { Store } from '@ngrx/store';
import { MetasService } from '../services/metas.service';
import { getLineamientoSeleccionado } from '../../lineamientos/selectors/lineamientos.selectors';
import { getRubroSeleccionado } from '../selectors/metas.selectors';


@Injectable()
export class MetasEffects {

  Lineamiento: any;
  Rubro: any;

  subscription$: any;

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private metasService: MetasService
  ) {
    this.subscription$ = combineLatest([
      this.store.select(getLineamientoSeleccionado),
      this.store.select(getRubroSeleccionado),
    ]).subscribe(([lineamiento, rubro]) => {
      if (lineamiento) {
        this.Lineamiento = lineamiento
      }
      if (rubro) {
        this.Rubro = rubro
      }
    })
  }

  loadMetass$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MetasActions.loadMetass),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetMetas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MetasActions.ConsultarMetas),
      mergeMap((opciones: any) =>
        this.metasService.getMetasAsociadas(
          opciones.Lineamiento.Id,
          opciones.Rubro.Codigo,
        ).pipe(
          map(data => MetasActions.CargarMetas([data])),
          catchError(data => of(MetasActions.CatchError(data))))
      )
    );
  });

  CrearMeta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MetasActions.CrearMeta),
      mergeMap((Meta: any) =>
        this.metasService.crearMeta(
          Meta,
        ).pipe(
          map((data) => MetasActions.SeleccionarMeta(
            data
          )),
          map(() => MetasActions.ConsultarMetas({
            Lineamiento: this.Lineamiento.Id,
            Rubro: this.Rubro.Codigo,
          })),
          catchError(data => of(MetasActions.CatchError(data))))
      )
    );
  });

  ActualizarMeta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MetasActions.ActualizarMeta),
      mergeMap((Meta: any) =>
        this.metasService.updateMeta(
          Meta,
        ).pipe(
          map((data) => MetasActions.SeleccionarMeta(
            data
          )),
          map(() => MetasActions.ConsultarMetas({
            Lineamiento: this.Lineamiento.Id,
            Rubro: this.Rubro.Codigo,
          })),
          catchError(data => of(MetasActions.CatchError(data))))
      )
    );
  });



}
