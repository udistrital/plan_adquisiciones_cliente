import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import { getAccionTabla, getFilaSeleccionada, getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { SeleccionarLineamiento } from '../../../lineamientos/actions/lineamientos.actions';
import { getFuenteRecursoSeleccionada, getLineamientos, getLineamientoSeleccionado } from '../../../lineamientos/selectors/lineamientos.selectors';
import { ConsultarMetas, SeleccionarMeta, SeleccionarRubro } from '../../actions/metas.actions';
import { CONFIGURACION_TABLA_METAS } from '../../interfaces/interfaces';
import { getMetas, getRubroSeleccionado } from '../../selectors/metas.selectors';

@Component({
  selector: 'ngx-table-metas',
  templateUrl: './table-metas.component.html',
  styleUrls: ['./table-metas.component.scss']
})
export class TableMetasComponent implements OnInit, OnDestroy {

  configuracion: any;

  fuenteRecurso: any;
  rubroSeleccionado: any;

  Lineamientos: any[] = [];
  LineamientoSeleccionado: any;

  Metas: any = [];

  subscription$: any;
  subscription2$: any;
  subscription3$: any;
  subscription4$: any;
  subscription5$: any;
  subscription6$: any;


  constructor(
    private store: Store<any>,
    private route: Router,
    private translateHelper: TranslateFormItemsHelper
  ) {
  }

  ngOnInit() {
    this.translateTableConfiguracion();
    // Cargar Metas
    this.subscription$ = this.store.select(getMetas).subscribe((metas) => {
      if (metas) {
        if (Object.keys(metas).length !== 0) {
          if (Object.keys(metas[0][0]).length !== 0) {
            this.Metas = metas[0];
          } else {
            this.Metas = [];
          }
        }
      }
    });
    this.subscription2$ = this.store.select(getRubroSeleccionado).subscribe((rubro: any) => {
      if (rubro) {
        this.store.dispatch(ConsultarMetas({
          Rubro: rubro,
        }));
      }
      if (rubro) {
        this.rubroSeleccionado = rubro;
      }
    });

    // Seleccionar Rubro
    this.subscription3$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (nodo) {
        if (Object.keys(nodo)[0] !== 'type') {
          if (nodo && !nodo.children) {
            this.SeleccionarRubro(nodo);
          }
        }
      }
    });

    // Seleccionar Meta (Editar o Actividades)
    this.subscription4$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        if (Object.keys(fila)[0] !== 'type') {
          this.store.dispatch(SeleccionarMeta(fila.fila));
          if (fila.accion.name === 'actividades') {
            this.route.navigate(['pages/plan-adquisiciones/actividades']);
            this.store.dispatch(LoadFilaSeleccionada(null));
          }
        }
      }
    });
    // Crear Nueva Meta
    this.subscription5$ = this.store.select(getAccionTabla).subscribe(() => {
      this.store.dispatch(SeleccionarMeta(null));
    });
  }
  SeleccionarRubro(rubro: any) {
    this.store.dispatch(SeleccionarRubro(rubro));
  }

  private translateTableConfiguracion(): void {
    this.configuracion = CONFIGURACION_TABLA_METAS;
    this.configuracion = this.translateHelper.translateItemTableConfiguration(this.configuracion);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
    this.subscription5$.unsubscribe();
  }
}
