import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { CargarActividades } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_PRUEBA_2, DATOS_PRUEBA_3 } from '../../interfaces/interfaces';
import { getActividades } from '../../selectors/registro-plan-adquisiciones.selectors';
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

  @ViewChild('formActividadesFuentes', { static: false }) contentRef: ElementRef;
  subscription$: any;

  constructor(
    private store: Store<any>,
    // private modalService: NgbModal,
    private renderer: Renderer2,
    private matDialog: MatDialog,
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_PRUEBA_2;
    this.store.dispatch(CargarActividades([DATOS_PRUEBA_3]));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {

    this.subscription$ = this.store.select(getActividades).subscribe((elementos: any) => {
      if (elementos) {
        this.Datos = elementos[0];
      }
    });
    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Agregar Actividad y Fuentes Asociadas') {
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
          if (accion.accion.title === 'Editar Actividad y Fuentes Asociadas') {
            this.OpenModal();
          }
        }
      }
    });
  }

  OpenModal() {
    this.matDialog.open(FormActividadFuentesComponent);
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

}
