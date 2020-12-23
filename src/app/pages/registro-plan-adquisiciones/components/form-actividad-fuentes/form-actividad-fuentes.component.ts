import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { CONFIGURACION_PRUEBA_4 } from '../../interfaces/interfaces';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { getActividades, getActividadSeleccionada, getFuentes, getMeta } from '../../selectors/registro-plan-adquisiciones.selectors';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormFuentesFinanciamientoComponent } from '../form-fuentes-financiamiento/form-fuentes-financiamiento.component';
import { CargarActividades, CargarFuentes, SeleccionarActividad, SeleccionarFuente } from '../../actions/registro-plan-adquisiciones.actions';
import { combineLatest } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';

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
  ActividadesAsociadas: any;



  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private actividadesService: ActividadesService,
    private matDialogRef: MatDialogRef<FormActividadFuentesComponent>,
    private matDialog: MatDialog,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Agregar Actividad';
    this.boton = 'Crear';
    // this.Datos = DATOS_PRUEBA_4;
    this.configuracion = CONFIGURACION_PRUEBA_4;
    this.ActividadesAsociadas = [];
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }

  ngOnInit() {
    // Traer Actividades y montar Actividad Seleccionada
    this.subscription$ = combineLatest([
      this.store.select(getMeta),
      this.store.select(getActividadSeleccionada),
      this.store.select(getActividades),
    ]).subscribe(([meta, actividad, actividades]) => {
      if (this.sharedService.IfStore(meta)) {
        this.actividadesService.getActividadesAsociadas(meta.Id).subscribe((actividades2: any) => {
          if (Object.keys(actividades2[0]).length !== 0) {
            this.Actividades = actividades2;
            if (this.sharedService.IfStore(actividad)) {
              this.CrearActividadFuentesForm(actividad);
              this.titulo = 'Editar Actividad';
              this.boton = 'Editar';
            } else {
              this.CrearActividadFuentesForm(null);
              this.titulo = 'Agregar Actividad';
              this.boton = 'Crear';
            }
          }
        });
      }
      if (this.sharedService.IfStore(actividades)) {
        this.ActividadesAsociadas = actividades[0];
      }
    });
    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Agregar Fuente de Financiamiento') {
          this.store.dispatch(SeleccionarFuente(null));
          this.OpenModal();
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Eliminar Fuente de Financiamiento') {
          this.LaunchDeleteModal(accion.index);
        }
        if (accion.accion.title === 'Editar Fuente de Financiamiento') {
          this.store.dispatch(SeleccionarFuente(accion.fila));
          this.OpenModal();
        }
      }
    });
    this.subscription4$ = this.store.select(getFuentes).subscribe((fuentes: any) => {
      if (this.sharedService.IfStore(fuentes)) {
        this.Datos = fuentes[0];
      } else {
        this.Datos = [];
      }
    });
  }
  CrearActividadFuentesForm(data: any) {

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
  }

  OpenModal() {
    if (this.ActividadFuentesForm) {
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
        });
      }
    }
  }

  OnClose() {
    this.matDialogRef.close();
  }
  LaunchDeleteModal(index: any) {
    Swal.fire({
      type: 'error',
      title: 'Esta Seguro de Eliminar',
      text: `El siguiente elemento?:`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((value) => {
      if (value.value) {
        console.log(index)
        this.Datos.splice(index, 1);
        this.store.dispatch(CargarFuentes([this.Datos]));
      }
    });
  }
  OnSubmit() {
    let Creacion = true;
    const Actividad = this.ActividadFuentesForm.value;
    Actividad.Actividad.Valor = Actividad.Valor;
    this.ActividadesAsociadas.forEach((element: any) => {
      if (Actividad.Actividad.Id === element.ActividadId.Id) {
        element.ActividadId.Valor = Actividad.Valor;
        element.Valor = Actividad.Valor;
        element.FuentesFinanciamiento = this.Datos;
        Creacion = false;
      }
    });
    if (Creacion) {
      this.ActividadesAsociadas.push({
        ActividadId: Actividad.Actividad,
        Valor: Actividad.Valor,
        FuentesFinanciamiento: this.Datos,
      });
    }
    this.store.dispatch(CargarActividades([this.ActividadesAsociadas]));
    this.OnClose();
  }
}
