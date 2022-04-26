import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as PlanesActions from '../actions/planes.actions';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { Store } from '@ngrx/store';
import { PlanesService } from '../services/planes.service';
import { ConsultarPlan } from '../actions/planes.actions';


@Injectable()
export class PlanesEffects {

  constructor(
    private actions$: Actions,
    private popupManager: PopUpManager,
    private store: Store<any>,
    private planesService: PlanesService,
  ) { }

  loadPlaness$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(PlanesActions.loadPlaness),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetPlanes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.ConsultarPlanes),
      exhaustMap(() =>
        this.planesService.getPlanes().pipe(
          map(data => {
            return PlanesActions.CargarPlanes([data]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });

  GetPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.ConsultarPlan),
      exhaustMap((opciones: any) =>
        this.planesService.getPlan(
          opciones.Id,
        ).pipe(
          map(data => {
            return PlanesActions.SeleccionarPlan(data);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });


  CrearPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.CrearPlan),
      exhaustMap((Plan: any) =>
        this.planesService.crearPlan(
          Plan,
        ).pipe(
          map((data) => {
            this.store.dispatch(ConsultarPlan(data));
            this.popupManager.showSuccessAlert('Plan Creado');
            return PlanesActions.ConsultarPlanes({});
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });

  ActualizarPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.ActualizarPlan),
      exhaustMap((Plan: any) =>
        this.planesService.updatePlan(
          Plan,
        ).pipe(
          map(() => {
            this.popupManager.showSuccessAlert('Plan Actualizada');
            return PlanesActions.ConsultarPlanes({});
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });


  GetPlanDetallado$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.ConsultarPlanDetallado),
      exhaustMap((opciones: any) =>
        this.planesService.getPlanDetallado(
          opciones.Id,
        ).pipe(
          map(data => {
            return PlanesActions.CargarPlanDetallado([data]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });

  GetVersionesPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.ConsultarVersionesPlan),
      exhaustMap((opciones: any) =>
        this.planesService.getVersionesPlan(
          opciones.Id,
        ).pipe(
          map(data => {
            // sort versions
            const data2 = data.sort((a: any, b: any) => new Date(a.fechacreacion).getTime() - new Date(b.fechacreacion).getTime());
            return PlanesActions.CargarVersionesPlan([data2]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });

  GetVersionPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanesActions.ConsultarVersion),
      exhaustMap((opciones: any) =>
        this.planesService.getVersionPlan(
          opciones._id,
        ).pipe(
          map(data => {
            return PlanesActions.CargarVersion(data);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(PlanesActions.CatchError(data));
          }))
      )
    );
  });

}
