import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
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

  constructor(
    private store: Store<any>,
    private matDialog: MatDialog,
    private sharedService: SharedService,
    private registroService: RegistroPlanAdquisicionesService,
    private actividadesService: ActividadesService,
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_TABLA_ACTIVIDADES_FUENTES;
    this.Datos = [];
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    this.store.select(getMeta).subscribe((meta: any) => {
      if (meta) {
        if (Object.keys(meta)[0] !== 'type') {
          this.Meta = meta;
        }
      }
    });
    this.subscription4$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        const actividad = this.MontarActividades(renglon[0]['registro_plan_adquisiciones-actividad']);
        this.store.dispatch(CargarActividades([actividad]));
      }
    });

    this.subscription$ = this.store.select(getActividades).subscribe((elementos: any) => {
      if (elementos) {
        this.Datos = JSON.parse(JSON.stringify(elementos[0]));
      }
    });

    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Agregar Actividad y Fuentes Asociadas') {
            this.store.dispatch(SeleccionarActividad(null));
            this.store.dispatch(CargarFuentes(null));
            setTimeout(() => {
              this.OpenModal();
            }, 0);

          }
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Editar Actividad y Fuentes Asociadas') {
            this.store.dispatch(SeleccionarActividad(accion.fila));
            this.store.dispatch(CargarFuentes([accion.fila.FuentesFinanciamiento]));
            setTimeout(() => {
              this.OpenModal();
            }, 0);
          }
        }
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

  MontarActividades(actividades: any[]) {
    return actividades.map((actividad) => {
      return {
        ActividadId: {
          Id: actividad.ActividadId,
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
