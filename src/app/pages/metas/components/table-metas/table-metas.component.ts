import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { DATOS_PRUEBA, CONFIGURACION_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-metas',
  templateUrl: './table-metas.component.html',
  styleUrls: ['./table-metas.component.scss']
})
export class TableMetasComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;

  fuenteRecurso: any;
  rubroSeleccionado: any;

  constructor(
    private store: Store<any>,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }

  ngOnInit() {
    this.store.select('lineamientos').subscribe((element: any) => {
      console.log(element)
      if(element) {
        this.fuenteRecurso = element.FuenteRecursoSeleccionada.Codigo
      }
    })
    this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (nodo && !nodo.children) {
        this.rubroSeleccionado = nodo;
      }
    })
  }

}
