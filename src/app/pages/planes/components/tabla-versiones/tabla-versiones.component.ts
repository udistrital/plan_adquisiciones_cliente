import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_PRUEBA_3, DATOS_PRUEBA_3 } from '../../interfaces/interfaces';
import { getVersionesPlan } from '../../selectors/planes.selectors';

@Component({
  selector: 'ngx-tabla-versiones',
  templateUrl: './tabla-versiones.component.html',
  styleUrls: ['./tabla-versiones.component.scss']
})
export class TablaVersionesComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  subscription2$: any;
  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    this.configuracion = CONFIGURACION_PRUEBA_3;
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((accion: any) => {
      if (this.sharedService.IfStore(accion)) {
        console.log(accion)
      }
    });
    this.subscription2$ = this.store.select(getVersionesPlan).subscribe((accion: any) => {
      console.log(accion)
      if (this.sharedService.IfStore(accion)) {
        this.datosPrueba = (accion[0] as Array<any>).map((element: any, index) => {
          return {
            _id: element._id,
            id: element.id,
            index: index,
          }
        })
      } else {
        this.datosPrueba = [];
      }
    });

  }
}
