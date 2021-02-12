import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_METAS_ASOCIADAS } from '../../interfaces/interfaces';
import { getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-metas-asociadas',
  templateUrl: './metas-asociadas.component.html',
  styleUrls: ['./metas-asociadas.component.scss']
})
export class MetasAsociadasComponent implements OnInit {

  configuracion: any;
  Datos: any;
  subscription2$: any;
  subscription3$: any;
  display: boolean;

  @ViewChild('exampleModal', { static: false }) contentRef: ElementRef;
  subscription$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private renderer: Renderer2,
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_TABLA_METAS_ASOCIADAS;
    this.Datos = []
    // this.store.dispatch(CargarElementosARKA([]));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }

  ngOnInit() {

    // this.subscription$ = this.store.select(getElementosARKA).subscribe((elementos: any) => {
    //   if (this.sharedService.IfStore(elementos)) {
    //     this.Datos = elementos[0];
    //   } else {
    //     this.Datos = [];
    //   }
    // });

    this.subscription4$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        // const elementos = this.MontarElementosARKA(renglon[0]['registro_plan_adquisiciones-codigo_arka']);
        // this.store.dispatch(CargarElementosARKA([elementos]));
      }
    });

    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Asociar Nueva Meta') {
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
          if (accion.accion.title === 'Eliminar Elemento') {
            this.LaunchDeleteModal(accion.fila);
          }
          if (accion.accion.title === 'Editar Elemento') {
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
        // this.store.dispatch(CargarElementosARKA([this.Datos]));
      }
    });
  }
  // MontarElementosARKA(elementos: any[]) {
  //   return elementos.map((elemento) => {
  //     const Nombre = (elemento.Descripcion as string).split('-')[1];
  //     return {
  //       Activo: elemento.Activo,
  //       Id: parseFloat(elemento.CodigoArka),
  //       Descripcion: elemento.Descripcion,
  //       Nombre: Nombre,
  //       CodigoArkaId: elemento.Id,
  //     };
  //   });
  // }

}
