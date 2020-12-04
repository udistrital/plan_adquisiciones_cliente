import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { CargarActividades } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_PRUEBA_2, DATOS_PRUEBA_3 } from '../../interfaces/interfaces';
import { getActividades } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-tabla-actividades-fuentes',
  templateUrl: './tabla-actividades-fuentes.component.html',
  styleUrls: ['./tabla-actividades-fuentes.component.scss']
})
export class TablaActividadesFuentesComponent implements OnInit {
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
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_PRUEBA_2;
    this.store.dispatch(CargarActividades([DATOS_PRUEBA_3]));
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
        if (Object.keys(accion)[0] !== 'type' && accion.accion.title === 'Agregar Actividad') {
          console.log(accion)
          this.store.dispatch(LoadFilaSeleccionada(null));
          this.OpenModal();
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.name === 'Eliminar') {
            this.LaunchDeleteModal(accion.fila);
          } else {
            this.OpenModal();
          }

        }
      }
    });
  }

  OpenModal() {
    this.display = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.contentRef.nativeElement).click();
      this.display = false;
    }, 0);
    // this.modalService.open(this.contentRef,{windowClass: 'modal-holder'})
  }


  LaunchDeleteModal(data: any) {
    Swal.fire({
      type: 'error',
      title: 'Esta Seguro de Eliminar',
      text: `El siguiente elemento?: ${data.Codigo} ${data.Nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((value) => {
      if (value.value) {
        // Quitar Elemento
        this.Datos.splice(this.Datos.findIndex((element: any) => element.Codigo === data.Codigo), 1);
        this.store.dispatch(CargarActividades([this.Datos]));
      }
    });
  }

}
