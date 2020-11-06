import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada, getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { loadMetaSeleccionada } from '../../actions/metas.actions';
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
  subscription3$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private route: Router
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }

  ngOnInit() {
    this.store.select('lineamientos').subscribe((element: any) => {
      // console.log(element)
      if (element) {
        this.fuenteRecurso = element.FuenteRecursoSeleccionada.Codigo;
      }
    });
    this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (nodo && !nodo.children) {
        this.rubroSeleccionado = nodo;
      }
    });
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(loadMetaSeleccionada(fila.fila));
        if (fila.accion.name === 'actividades') {
          this.route.navigate(['pages/plan-adquisiciones/actividades']);
        }
      }
    });
    this.subscription4$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(loadMetaSeleccionada(null));
    });
  }

}
