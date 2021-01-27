import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2';
import { PopUpManager } from '../../../../@core/managers/popUpManager';

import { getAccionTabla, getAreaFuncional, getCentroGestor, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { CargarActividades, CargarFuentes, SeleccionarActividad } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_TABLA_ACTIVIDADES_FUENTES } from '../../interfaces/interfaces';
import { getActividades, getMeta, getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';
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
    this.subscription7$.unsubscribe();
  }

  ngOnInit() {
    this.subscription5$ = this.store.select(getMeta).subscribe((meta: any) => {
      if (meta) {
        if (Object.keys(meta)[0] !== 'type') {
          this.Meta = JSON.parse(JSON.stringify(meta));
        }
      }
    });
    this.subscription4$ = combineLatest([
      this.store.select(getMeta),
      this.store.select(getRenglonSeleccionado),
    ]).subscribe(([meta, renglon]) => {
      if (this.sharedService.IfStore(renglon) && this.sharedService.IfStore(meta)) {
        if (parseFloat(renglon[0]['MetaId']) === meta.Id) {
          this.actividadesService.getActividadesAsociadas(meta.Id).subscribe((actividades2: any) => {
            const actividad = this.MontarActividades(renglon[0]['registro_plan_adquisiciones-actividad'], actividades2);
            this.store.dispatch(CargarActividades([actividad]));
          });
        } else {
          this.store.dispatch(CargarActividades(null));
        }
      }
    });

    this.subscription$ = this.store.select(getActividades).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.Datos = JSON.parse(JSON.stringify(elementos[0]));
      } else {
        this.Datos = [];
      }
    });

    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {

      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Agregar Actividad y Fuentes Asociadas') {
          if (this.CentroGestor && this.AreaFuncional) {
            this.store.dispatch(SeleccionarActividad(null));
            this.store.dispatch(CargarFuentes(null));
            setTimeout(() => {
              this.OpenModal();
            }, 0);
          } else {
            this.popupService.showInfoAlert('Selecciona el centro gestor y el area funcional', 'Info');
          }
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Editar Actividad y Fuentes Asociadas') {
          if (this.CentroGestor && this.AreaFuncional) {
            this.store.dispatch(SeleccionarActividad(accion.fila));
            this.store.dispatch(CargarFuentes([accion.fila.FuentesFinanciamiento]));
            setTimeout(() => {
              this.OpenModal();
            }, 0);
          } else {
            this.popupService.showInfoAlert('Seleccionar el centro gestor y el area funcional', 'Info');
          }
        }
      }
    });
    this.subscription6$ = this.store.select(getAreaFuncional).subscribe((area: any) => {
      if (this.sharedService.IfStore(area)) {
        this.AreaFuncional = area;
      } else {
        this.AreaFuncional = undefined;
      }
    });
    this.subscription7$ = this.store.select(getCentroGestor).subscribe((centro: any) => {
      if (this.sharedService.IfStore(centro)) {
        this.CentroGestor = centro.CentroGestor;
      } else {
        this.CentroGestor = undefined;
      }
    });
  }

  OpenModal() {
    if (this.Meta) {
      this.matDialog.open(FormActividadFuentesComponent);
    } else {
      Swal.fire({
        type: 'error',
        title: 'No Existen Datos',
        text: 'Es Necesario seleccionar una Meta',
        confirmButtonText: 'Aceptar',
      });
    }

  }

  LaunchDeleteModal(data: any) {
    Swal.fire({
      type: 'error',
      title: 'Eliminar?',
      text: `${data.Codigo} - ${data.Nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((value) => {
      if (value.value) {
        // Quitar Elemento
      }
    });
  }

  MontarActividades(actividades: any[], datos: any) {
    return actividades.map((actividad) => {
      const info = datos.find((x: any) => x.Id === actividad.ActividadId);
      return {
        ActividadId: {
          Id: actividad.ActividadId,
          Id2: info.Numero + '.' + info.MetaId.Numero + '.' + info.MetaId.LineamientoId.Numero,
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
