import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { CONFIGURACION_PRUEBA_4 } from '../../interfaces/interfaces';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { getActividadSeleccionada, getFuentes, getMeta } from '../../selectors/registro-plan-adquisiciones.selectors';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormFuentesFinanciamientoComponent } from '../form-fuentes-financiamiento/form-fuentes-financiamiento.component';
import { SeleccionarFuente } from '../../actions/registro-plan-adquisiciones.actions';
import { combineLatest } from 'rxjs';

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
  subscription4$: any;



  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private actividadesService: ActividadesService,
    private matDialogRef: MatDialogRef<FormActividadFuentesComponent>,
    private matDialog: MatDialog,
  ) {
    this.titulo = 'Agregar Actividad';
    this.boton = 'Crear';
    // this.Datos = DATOS_PRUEBA_4;
    this.configuracion = CONFIGURACION_PRUEBA_4;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    // Traer Actividades y montar Actividad Seleccionada
    this.subscription$ = combineLatest([
      this.store.select(getMeta),
      this.store.select(getActividadSeleccionada),
    ]).subscribe(([meta, actividad]) => {
      if (meta) {
        if (Object.keys(meta)[0] !== 'type') {
          this.actividadesService.getActividadesAsociadas(meta.Id).subscribe((actividades: any) => {
            if (Object.keys(actividades[0]).length !== 0) {
              this.Actividades = actividades;
              console.log(actividades);
              if (actividad) {
                if (Object.keys(actividad)[0] !== 'type') {
                  this.CrearActividadFuentesForm(actividad);
                } else {
                  this.CrearActividadFuentesForm(null);
                }
              } else {
                this.CrearActividadFuentesForm(null);
              }
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
            this.store.dispatch(SeleccionarFuente(accion.fila))
            this.OpenModal();
          }
        }
      }
    });
    this.store.select(getFuentes).subscribe((fuentes: any) => {
      console.log(fuentes);
      if (fuentes) {
        if (Object.keys(fuentes)[0] !== 'type') {
          this.Datos = fuentes[0];
        } else {
          this.Datos = [];
        }
      } else {
        this.Datos = [];
      }
    })
  }
  CrearActividadFuentesForm(data: any) {
    console.log(data);
    if (data) {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [this.Actividades.find((element: any) => element.Id === data.ActividadId.Id), []],
        Valor: [data.Valor, []],
      });
    } else {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [null, []],
        Valor: [null, []],
      });
    }
    this.ActividadFuentesForm.valueChanges.subscribe((data: any) => {
      console.log(data);
    })
  }

  OpenModal() {
    if (this.ActividadFuentesForm.value.Valor) {
      this.matDialog.open(FormFuentesFinanciamientoComponent, {
        data: this.ActividadFuentesForm.value,
      });
    } else {
      Swal.fire({
        type: 'error',
        title: 'No Existen Datos',
        text: `Es necesario el valor de la actividad`,
        confirmButtonText: 'Aceptar',
      })
    }

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
