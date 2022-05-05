import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2';
import { PopUpManager } from '../../../../@core/managers/popUpManager';

import { getAccionTabla, getAreaFuncional, getCentroGestor, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { CargarActividades, CargarFuentes, SeleccionarActividad } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_TABLA_ACTIVIDADES_FUENTES } from '../../interfaces/interfaces';
import { getActividades, getMeta, getMetasAsociadas, getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';
import { FormActividadFuentesComponent } from '../form-actividad-fuentes/form-actividad-fuentes.component';

@Component({
  selector: 'ngx-tabla-actividades-fuentes',
  templateUrl: './tabla-actividades-fuentes.component.html',
  styleUrls: ['./tabla-actividades-fuentes.component.scss']
})
export class TablaActividadesFuentesComponent implements OnInit, OnDestroy {

  configuracion: any;
  Datos: any;
  subscription2$: any;
  subscription3$: any;
  display: boolean;
  subscription$: any;
  Meta: any;
  subscription4$: any;
  subscription5$: any;
  AreaFuncional: any;
  CentroGestor: any;
  subscription6$: any;
  subscription7$: any;

  constructor(
    private store: Store<any>,
    private matDialog: MatDialog,
    private sharedService: SharedService,
    private actividadesService: ActividadesService,
    private popupService: PopUpManager,
    private translate: TranslateService
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_TABLA_ACTIVIDADES_FUENTES;
    this.Datos = [];
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
    this.subscription5$.unsubscribe();
    this.subscription6$.unsubscribe();
  }

  ngOnInit() {


    this.subscription$ = this.store.select(getMetasAsociadas).subscribe((metas: any) => {
      if (this.sharedService.IfStore(metas)) {
        this.Meta = metas[0];
      }
    });
    this.subscription2$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        const actividad = this.MontarActividades(renglon[0]['registro_plan_adquisiciones-actividad']);
        this.store.dispatch(CargarActividades([actividad]));
      } else {
        this.store.dispatch(CargarActividades(null));
      }
    });

    this.subscription3$ = this.store.select(getActividades).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.Datos = JSON.parse(JSON.stringify(elementos[0])); // no quitar funciones JSON, por efectos de renderizacion de tabla
      } else {
        this.Datos = [];
      }
    });

    // Seleccionar Elemento
    this.subscription4$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Agregar Actividad y Fuentes Asociadas') {
          if (this.CentroGestor && this.AreaFuncional && this.Meta) {
            this.store.dispatch(SeleccionarActividad(null));
            this.store.dispatch(CargarFuentes(null));
            setTimeout(() => {
              this.OpenModal();
            }, 0);
          } else {
            this.FaltanDatos();
          }
        }
      }
    });
    // Nuevo Elemento
    this.subscription5$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Editar Actividad y Fuentes Asociadas') {
          if (this.CentroGestor && this.AreaFuncional && this.Meta) {
            this.store.dispatch(SeleccionarActividad(accion.fila));
            this.store.dispatch(CargarFuentes([accion.fila.FuentesFinanciamiento]));
            setTimeout(() => {
              this.OpenModal();
            }, 0);
          } else {
            this.FaltanDatos();
          }
        }
      }
    });
    this.subscription6$ = combineLatest([
      this.store.select(getAreaFuncional),
      this.store.select(getCentroGestor),
      this.store.select(getMetasAsociadas),
    ]).subscribe(([area, centro, metas]) => {
      if (
        this.sharedService.IfStore(area) &&
        this.sharedService.IfStore(centro) &&
        this.sharedService.IfStore(metas)
      ) {
        this.AreaFuncional = area;
        this.CentroGestor = centro.CentroGestor;
        this.Meta = metas[0];
      } else {
        this.AreaFuncional = undefined;
        this.CentroGestor = undefined;
        this.Meta = undefined;
      }
    });
  }

  OpenModal() {
    this.matDialog.open(FormActividadFuentesComponent);
  }
  FaltanDatos() {
    this.popupService.showInfoAlert(this.translate.instant('AVISOS.seleccione_centro_gestor_area_funcional_meta'), this.translate.instant('GLOBAL.info'));
  }

  LaunchDeleteModal(data: any) {
    Swal.fire({
      type: this.translate.instant('AVISOS.error'),
      title: this.translate.instant('AVISOS.eliminar_elemento_titulo'),
      text: this.translate.instant('AVISOS.codigo_nombre', { CODIGO: data.Codigo, NOMBRE: data.Nombre }),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    }).then((value) => {
      if (value.value) {
        // Quitar Elemento
      }
    });
  }

  MontarActividades(actividades: any[]) {
    return actividades.map((actividad) => {
      return {
        ActividadId: {
          Id: actividad.ActividadId,
          Id2: actividad.Numero + '.' + actividad.NumeroMeta,
          Nombre: actividad.Nombre,
          Activo: actividad.Activo,
          Valor: actividad.Valor,
          ActividadId: actividad.Id,
          RegistroActividadId: actividad.RegistroActividadId,
          RegistroPlanAdquisicionesId: actividad.RegistroPlanAdquisicionesId,
        },
        Valor: actividad.Valor,
        FuentesFinanciamiento: this.MontarFuentes(actividad.FuentesFinanciamiento, actividad.Valor),
      };
    });
  }

  MontarFuentes(fuentes: any[], valorActividad: any) {
    return fuentes.map((fuente) => {
      return {
        Activo: fuente.Activo,
        Codigo: fuente.FuenteFinanciamiento,
        Id: fuente.Id,
        Nombre: fuente.Nombre,
        Valor: fuente.ValorAsignado,
        Porcentaje: fuente.ValorAsignado / valorActividad,
      };
    });
  }

}
