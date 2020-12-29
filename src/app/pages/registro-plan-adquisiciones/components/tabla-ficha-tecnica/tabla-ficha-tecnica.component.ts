import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_PRUEBA_5, DATOS_PRUEBA_5 } from '../../interfaces/interfaces';
import { FormFichaTecnicaComponent } from '../form-ficha-tecnica/form-ficha-tecnica.component';

@Component({
  selector: 'ngx-tabla-ficha-tecnica',
  templateUrl: './tabla-ficha-tecnica.component.html',
  styleUrls: ['./tabla-ficha-tecnica.component.scss']
})
export class TablaFichaTecnicaComponent implements OnInit, OnDestroy{

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  subscription2$: any;
  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private matDialog: MatDialog,
  ) {
    this.datosPrueba = DATOS_PRUEBA_5;
    this.configuracion = CONFIGURACION_PRUEBA_5;
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((accion: any) => {
      if (this.sharedService.IfStore(accion)) {
        this.OpenModal();
      }
    });
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        this.OpenModal();
      }
    });
  }
  OpenModal() {
    this.matDialog.open(FormFichaTecnicaComponent);
  }

}
