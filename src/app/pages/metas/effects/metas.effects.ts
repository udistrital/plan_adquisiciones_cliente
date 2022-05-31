import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, exhaustMap } from 'rxjs/operators';
import { combineLatest, EMPTY, of } from 'rxjs';

import * as MetasActions from '../actions/metas.actions';
import { Store } from '@ngrx/store';
import { MetasService } from '../services/metas.service';
import { getLineamientoSeleccionado } from '../../lineamientos/selectors/lineamientos.selectors';
import { getRubroSeleccionado } from '../selectors/metas.selectors';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { ConsultarMeta } from '../actions/metas.actions';


@Injectable()
export class MetasEffects {

  Lineamiento: any;
  Rubro: any;

  subscription$: any;

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private metasService: MetasService,
    private popupManager: PopUpManager,
  ) {
    this.subscription$ = combineLatest([
      this.store.select(getRubroSeleccionado),
    ]).subscribe(([rubro]) => {
      if (rubro) {
        this.Rubro = rubro;
      }
    });
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
      exhaustMap((opciones: any) =>
        this.metasService.getMetasAsociadas(
          opciones.Rubro.data.Codigo,
        ).pipe(
          map(data => {
            return MetasActions.CargarMetas([data]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(MetasActions.CatchError(data));
          }))
      )
    );
  });

  GetMeta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MetasActions.ConsultarMeta),
      exhaustMap((opciones: any) =>
        this.metasService.getMeta(
          opciones.Id,
        ).pipe(
          map(data => {
            return MetasActions.SeleccionarMeta(data[0]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(MetasActions.CatchError(data));
          }))
      )
    );
  });

  CrearMeta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MetasActions.CrearMeta),
      exhaustMap((Meta: any) =>
        this.metasService.crearMeta(
          Meta,
        ).pipe(
          map(() => {
            this.popupManager.showSuccessAlert('Meta Creada');
            return MetasActions.ConsultarMetas({
              Rubro: this.Rubro,
            });
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(MetasActions.CatchError(data));
          }))
      )
    );
  });

  ActualizarMeta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MetasActions.ActualizarMeta),
      exhaustMap((Meta: any) =>
        this.metasService.updateMeta(
          Meta,
        ).pipe(
          map(() => {
            this.popupManager.showSuccessAlert('Meta Actualizada');
            return MetasActions.ConsultarMetas({
              Lineamiento: this.Lineamiento,
              Rubro: this.Rubro,
            });
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(MetasActions.CatchError(data));
          }))
      )
    );
  });
}
