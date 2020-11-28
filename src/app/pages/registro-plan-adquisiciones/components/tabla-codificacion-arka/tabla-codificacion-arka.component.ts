import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA_2 } from '../../interfaces/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-tabla-codificacion-arka',
  templateUrl: './tabla-codificacion-arka.component.html',
  styleUrls: ['./tabla-codificacion-arka.component.scss']
})
export class TablaCodificacionArkaComponent implements OnInit {
  configuracion: any;
  datosPrueba: any;
  subscription2$: any;
  subscription3$: any;

  @ViewChild('content', { static: false }) contentRef: ElementRef;

  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
  ) {
    this.configuracion = CONFIGURACION_PRUEBA;
    this.datosPrueba = DATOS_PRUEBA_2
  }

  ngOnInit() {
    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          this.OpenModal()
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          this.OpenModal()
        }
      }
    });
  }

  OpenModal() {
    console.log(this.contentRef);
    this.modalService.open(this.contentRef,{windowClass: 'modal-holder'})
  }

}
