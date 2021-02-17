import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarProductosAsociados } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS } from '../../interfaces/interfaces';
import { getProductosAsociados, getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-productos-asociados',
  templateUrl: './productos-asociados.component.html',
  styleUrls: ['./productos-asociados.component.scss']
})
export class ProductosAsociadosComponent implements OnInit, OnDestroy {

  configuracion: any;
  Datos: any;
  subscription2$: any;
  subscription3$: any;
  display: boolean;

  @ViewChild('exampleModal3', { static: false }) contentRef: ElementRef;
  subscription$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private renderer: Renderer2,
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS;
    this.Datos = [];
    // this.store.dispatch(CargarElementosARKA([]));
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }

  ngOnInit() {

    this.subscription$ = this.store.select(getProductosAsociados).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.Datos = elementos[0];
      } else {
        this.Datos = [];
      }
    });

    this.subscription2$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        const elementos = this.MontarProductosAsociados(renglon[0]['registro_funcionamiento-productos_asociados']);
        this.store.dispatch(CargarProductosAsociados([elementos]));
      }
    });

    // Seleccionar Elemento
    this.subscription3$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Asociar Nuevo Producto') {
            if (this.CalcularPorcentajeMaximo()) {
              this.store.dispatch(LoadFilaSeleccionada(null));
              this.OpenModal();
            } else {
              this.LaunchValueNullModal();
            } 
          }
        }
      }
    });
    // Nuevo Elemento
    this.subscription4$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Eliminar Producto Asociado') {
            this.LaunchDeleteModal(accion.fila);
          }
          if (accion.accion.title === 'Editar Producto Asociado') {
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
        this.Datos.splice(this.Datos.findIndex((element: any) => element.id === data.id), 1);
        this.store.dispatch(CargarProductosAsociados([this.Datos]));
      }
    });
  }
  MontarProductosAsociados(elementos: any[]) {
    return elementos.map((elemento) => {
      return {
        IdRegistro: elemento.Id,
        ActivoRegistro: elemento.Activo,
        PorcentajeDistribucion: elemento.PorcentajeDistribucion,
        PorcentajeDistribucion2: elemento.PorcentajeDistribucion / 100,
        ...elemento.ProductoData
      }
    });
  }
  CalcularPorcentajeMaximo() {
    const total = this.Datos.reduce((acc: any, value: any) => acc + value.PorcentajeDistribucion, 0);
    if (total < 100) {
      return true
    } else {
      return false
    }
  }
  LaunchValueNullModal() {
    Swal.fire({
      type: 'success',
      title: 'Porcentajes de Distribucion completado',
      text: `Si desea agregar mas productos es necesario reducir los porcentajes asignados previamente`,
      confirmButtonText: 'Aceptar',
    })
  }

}
