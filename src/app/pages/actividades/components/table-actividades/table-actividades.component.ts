import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { getMetaSeleccionada } from '../../../metas/selectors/metas.selectors';
import { ConsultarActividades, SeleccionarActividad } from '../../actions/actividades.actions';
import { CONFIGURACION_TABLA_ACTIVIDADES } from '../../interfaces/interfaces';
import { getActividades } from '../../selectors/actividades.selectors';

@Component({
  selector: 'ngx-table-actividades',
  templateUrl: './table-actividades.component.html',
  styleUrls: ['./table-actividades.component.scss']
})
export class TableActividadesComponent implements OnInit, OnDestroy {

  configuracion: any;
  subscription$: any;
  Actividades: any = [];
  subscription3$: any;
  subscription2$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private translateHelper: TranslateFormItemsHelper
  ) {
  }

  ngOnInit() {
    this.translateTableConfiguracion();
    // Consultar Actividades
    this.subscription$ = this.store.select(getMetaSeleccionada).subscribe((meta) => {
      if (meta) {
        this.store.dispatch(ConsultarActividades({
          Meta: meta,
        }));
      }
    });
    // Cargar Metas
    this.subscription2$ = this.store.select(getActividades).subscribe((actividades) => {
      if (actividades) {
        if (actividades.length !== 0) {
          if (actividades[0].length !== 0) {
            this.Actividades = actividades[0];
          } else {
            this.Actividades = [];
          }
        } else{
          this.Actividades = [];
        }
      }
    });
    // Seleccionar Actividad
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        if (Object.keys(fila)[0] !== 'type') {
          this.store.dispatch(SeleccionarActividad(fila.fila));
        }
      }
    });
    // Crear Actividad
    this.subscription4$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(SeleccionarActividad(null));
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }

  private translateTableConfiguracion(): void {
    this.configuracion = this.translateHelper
      .translateItemTableConfiguration(CONFIGURACION_TABLA_ACTIVIDADES);
  }
}
