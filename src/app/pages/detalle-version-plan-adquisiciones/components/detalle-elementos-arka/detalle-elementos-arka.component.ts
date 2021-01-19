import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_ELEMENTOS_ARKA } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-elementos-arka',
  templateUrl: './detalle-elementos-arka.component.html',
  styleUrls: ['./detalle-elementos-arka.component.scss']
})
export class DetalleElementosArkaComponent implements OnInit {

  configuracion: any;
  Datos: any[];

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    const formatoTabla = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_ELEMENTOS_ARKA));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.Datos = [];

  }

  ngOnInit() {
  }

}
