import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarMetasAsociadas } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_TABLA_METAS_ASOCIADAS } from '../../interfaces/interfaces';
import { getMetasAsociadas, getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-metas-asociadas',
  templateUrl: './metas-asociadas.component.html',
  styleUrls: ['./metas-asociadas.component.scss']
})
export class MetasAsociadasComponent implements OnInit, OnDestroy {

  configuracion: any;
  Datos: any;
  subscription2$: any;
  subscription3$: any;
  display: boolean;

  @ViewChild('exampleModal2', { static: false }) contentRef: ElementRef;
  subscription$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {
    this.display = false;
    this.configuracion = CONFIGURACION_TABLA_METAS_ASOCIADAS;
    this.Datos = [];
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }

  ngOnInit() {

    this.subscription$ = this.store.select(getMetasAsociadas).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.Datos = elementos[0];
      } else {
        this.Datos = [];
      }
    });

    this.subscription2$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        const elementos = this.MontarMetasAsociadas(renglon[0]['registro_funcionamiento-metas_asociadas']);
        this.store.dispatch(CargarMetasAsociadas([elementos]));
      }
    });

    // Seleccionar Elemento
    this.subscription3$ = this.store.select(getAccionTabla).subscribe((accion) => {
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
    this.subscription4$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          if (accion.accion.title === 'Eliminar Meta Asociada') {
            this.LaunchDeleteModal(accion.fila);
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
  }


  LaunchDeleteModal(data: any) {
    Swal.fire({
      type: this.translate.instant('AVISOS.error'),
      title: this.translate.instant('AVISOS.eliminar_elemento_titulo'),
      text: this.translate.instant('AVISOS.eliminar_elemento', { CODIGO: data.Numero, NOMBRE: data.Nombre }),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    }).then((value) => {
      if (value.value) {
        // Quitar Elemento
        this.Datos.splice(this.Datos.findIndex((element: any) => element.IdRegistro === data.IdRegistro), 1);
        this.store.dispatch(CargarMetasAsociadas([this.Datos]));
      }
    });
  }
  MontarMetasAsociadas(elementos: any[]) {
    return elementos.map((elemento) => {
      return {
        IdRegistro: elemento.Id,
        ActivoRegistro: elemento.Activo,
        ...elemento.MetaId
      };
    });
  }

}
