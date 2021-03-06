import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as RegistroPlanAdquisicionesActions from '../actions/registro-plan-adquisiciones.actions';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { RegistroPlanAdquisicionesService } from '../services/registro-plan-adquisiciones.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Injectable()
export class RegistroPlanAdquisicionesEffects {

  constructor(
    private actions$: Actions,
    private popupManager: PopUpManager,
    private registroPlanService: RegistroPlanAdquisicionesService,
    private router: Router,
    private store: Store<any>,
  ) { }

  loadRegistroPlanAdquisicioness$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RegistroPlanAdquisicionesActions.loadRegistroPlanAdquisicioness),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetRenglonPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistroPlanAdquisicionesActions.ConsultarRenglonPlan),
      exhaustMap((opciones: any) => {
        return this.registroPlanService.getRenglonPlan(
          opciones.Id,
        ).pipe(
          map((data: any) => {
            return RegistroPlanAdquisicionesActions.CargarRenglonPlan(data);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(RegistroPlanAdquisicionesActions.CatchError(data));
          }));
      }
      )
    );
  });

  CrearPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistroPlanAdquisicionesActions.CrearRenglonPlan),
      exhaustMap((Plan: any) =>
        this.registroPlanService.CrearRenglonPlan(
          Plan,
        ).pipe(
          map((data: any) => {
            this.popupManager.showSuccessAlert('Rubro Agregado');
            return RegistroPlanAdquisicionesActions.ConsultarRenglonPlan(data[0]);
            // return RegistroPlanAdquisicionesActions.CatchError(data);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(RegistroPlanAdquisicionesActions.CatchError(data));
          }))
      )
    );
  });

  ActualizarPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistroPlanAdquisicionesActions.ActualizarRenglonPlan),
      exhaustMap((Plan: any) =>
        this.registroPlanService.UpdateRenglonPlan(
          Plan,
        ).pipe(
          map((data: any) => {
            this.popupManager.showSuccessAlert('Rubro Ajustado');
            return RegistroPlanAdquisicionesActions.ConsultarRenglonPlan(data.Body);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(RegistroPlanAdquisicionesActions.CatchError(data));
          }))
      )
    );
  });


  GetFichaTecnica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistroPlanAdquisicionesActions.ConsultarFichaTecnica),
      exhaustMap((opciones: any) => {
        return this.registroPlanService.getFichaTecnica(
          opciones.PlanAdquisicionesId.Id,
          opciones.Rubro,
        ).pipe(
          map((data: any) => {
            return RegistroPlanAdquisicionesActions.CargarFichaTecnica([data]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(RegistroPlanAdquisicionesActions.CatchError(data));
          }));
      }
      )
    );
  });

  CrearRenglonFicha$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistroPlanAdquisicionesActions.CrearRenglonFicha),
      exhaustMap((ficha: any) =>
        this.registroPlanService.CrearRenglonFichaTecnica(
          ficha,
        ).pipe(
          map((data: any) => {
            this.popupManager.showSuccessAlert('Ficha Agregada');
            return RegistroPlanAdquisicionesActions.ConsultarFichaTecnica(data);
            // return RegistroPlanAdquisicionesActions.CatchError(data);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(RegistroPlanAdquisicionesActions.CatchError(data));
          }))
      )
    );
  });

  ActualizarRenglonFicha$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistroPlanAdquisicionesActions.ActualizarRenglonFicha),
      exhaustMap((ficha: any) =>
        this.registroPlanService.UpdateRenglonFichaTecnica(
          ficha,
        ).pipe(
          map((data: any) => {
            this.popupManager.showSuccessAlert('Ficha Ajustada');
            return RegistroPlanAdquisicionesActions.ConsultarFichaTecnica(data);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(RegistroPlanAdquisicionesActions.CatchError(data));
          }))
      )
    );
  });

}
