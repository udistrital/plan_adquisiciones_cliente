import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { CONFIGURACION_PRUEBA, CONFIGURACION_PRUEBA_4, DATOS_PRUEBA, DATOS_PRUEBA_4 } from '../../interfaces/interfaces';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { getMeta } from '../../selectors/registro-plan-adquisiciones.selectors';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormFuentesFinanciamientoComponent } from '../form-fuentes-financiamiento/form-fuentes-financiamiento.component';

@Component({
  selector: 'ngx-form-actividad-fuentes',
  templateUrl: './form-actividad-fuentes.component.html',
  styleUrls: ['./form-actividad-fuentes.component.scss']
})
export class FormActividadFuentesComponent implements OnInit, OnDestroy {

  titulo: string;
  boton: string;
  Actividades: any;
  ActividadFuentesForm: FormGroup;
  subscription$: any;
  configuracion: any;
  Datos: any;
  subscription2$: any;
  subscription3$: any;
  display: boolean;



  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private actividadesService: ActividadesService,
    private currencyPipe: CurrencyPipe,
    private renderer: Renderer2,
    private matDialogRef: MatDialogRef<FormActividadFuentesComponent>,
    private matDialog: MatDialog,
  ) {
    this.titulo = 'Agregar Actividad';
    this.boton = 'Crear';
    this.Datos = DATOS_PRUEBA_4;
    this.configuracion = CONFIGURACION_PRUEBA_4;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getMeta).subscribe((meta: any) => {
      if (meta) {
        if (Object.keys(meta)[0] !== 'type') {
          this.actividadesService.getActividadesAsociadas(meta.Id).subscribe((actividades: any) => {
            if (Object.keys(actividades[0]).length !== 0) {
              this.Actividades = actividades;
            }
          });
        }
      }
    });

    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Agregar Fuente de Financiamiento') {
            this.store.dispatch(LoadFilaSeleccionada(null));
            this.OpenModal();
          }
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Eliminar Fuente de Financiamiento') {
            this.LaunchDeleteModal(accion.fila);
          }
          if (accion.accion.title === 'Editar Fuente de Financiamiento') {
            this.OpenModal();
          }

        }
      }
    });
    this.CrearActividadFuentesForm(null);
  }
  CrearActividadFuentesForm(data: any) {
    if (data) {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [null, []],
        RegistroPlanAdquisicionesId: [null, []],
        Valor: [null, []],
      });
    } else {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [null, []],
        RegistroPlanAdquisicionesId: [null, []],
        Valor: [null, []],
      });
    }
  }

  OpenModal() {
    this.matDialog.open(FormFuentesFinanciamientoComponent);
  }
  OnClose() {
    this.matDialogRef.close();
  }
  LaunchDeleteModal(data?: any) {
    Swal.fire({
      type: 'error',
      title: 'Esta Seguro de Eliminar',
      text: `El siguiente elemento?:`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((value) => {
      if (value.value) {
        // Quitar Elemento
      }
    });
  }
  OnSubmit() {
  }
}
