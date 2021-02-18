import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';
import { CONFIGURACION_TABLA_METAS_ASOCIADAS } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-metas-asociadas',
  templateUrl: './detalle-metas-asociadas.component.html',
  styleUrls: ['./detalle-metas-asociadas.component.scss']
})
export class DetalleMetasAsociadasComponent implements OnInit {
  @Input() datos: any;
  configuracion: any;
  Datos: any[];

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    const formatoTabla = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_METAS_ASOCIADAS));
    delete formatoTabla.tableActions;
    delete formatoTabla.rowActions;
    this.configuracion = formatoTabla;
    this.Datos = [];
  }

  ngOnInit() {
    this.Datos = this.MontarMetasAsociadas(this.datos['registro_funcionamiento-metas_asociadas']);
  }
  MontarMetasAsociadas(elementos: any[]) {
    return elementos.map((elemento) => {
      return {
        IdRegistro: elemento.Id,
        ActivoRegistro: elemento.Activo,
        ...elemento.MetaId
      }
    });
  }

}
