import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, exhaustMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ActividadesActions from '../actions/actividades.actions';
import { ActividadesService } from '../services/actividades.service';
import { Store } from '@ngrx/store';
import { getMetaSeleccionada } from '../../metas/selectors/metas.selectors';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { ConsultarActividad } from '../actions/actividades.actions';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ActividadesEffects {

  subscription$: any;
  Meta: any;

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private actividadesService: ActividadesService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
  ) {
    this.subscription$ = this.store.select(getMetaSeleccionada).subscribe((meta) => {
      if (meta) {
        this.Meta = meta;
      }
    });
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
      exhaustMap((opciones: any) =>
        this.actividadesService.getActividadesAsociadas(
          opciones.Meta.Id,
        ).pipe(
          map(data => {
            return ActividadesActions.CargarActividades([data]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(ActividadesActions.CatchError(data));
          }))
      )
    );
  });

  GetActividad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActividadesActions.ConsultarActividad),
      exhaustMap((opciones: any) =>
        this.actividadesService.getActividad(
          opciones.Id,
        ).pipe(
          map(data => {
            return ActividadesActions.SeleccionarActividad(data[0]);
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(ActividadesActions.CatchError(data));
          }))
      )
    );
  });


  CrearActividad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActividadesActions.CrearActividad),
      exhaustMap((Actividad: any) =>
        this.actividadesService.crearActividad(
          Actividad,
        ).pipe(
          map(() => {
            this.popupManager.showSuccessAlert(this.translate.instant('ACTIVIDAD.actividad_creada'));
            return ActividadesActions.ConsultarActividades({
              Meta: this.Meta,
            });
          }),
          catchError(data => {
            this.popupManager.showAlert(this.translate.instant('ERROR.error'), data.status, data.statusText);
            return of(ActividadesActions.CatchError(data));
          }))
      )
    );
  });

  ActualizarActividad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActividadesActions.ActualizarActividad),
      exhaustMap((Actividad: any) =>
        this.actividadesService.updateActividad(
          Actividad,
        ).pipe(
          map(() => {
            this.popupManager.showSuccessAlert('Actividad Actualizada');
            return ActividadesActions.ConsultarActividades({
              Meta: this.Meta,
            });
          }),
          catchError(data => {
            this.popupManager.showAlert('error', data.status, data.statusText);
            return of(ActividadesActions.CatchError(data));
          }))
      )
    );
  });
}
