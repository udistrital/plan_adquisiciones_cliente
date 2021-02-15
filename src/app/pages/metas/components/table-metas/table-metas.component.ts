import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
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
    private route: Router
  ) {
    this.configuracion = CONFIGURACION_TABLA_METAS;
  }

  ngOnInit() {
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
    this.subscription3$ = this.store.select(getRubroSeleccionado).subscribe((rubro: any) => {
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
    this.subscription4$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (nodo) {
        if (Object.keys(nodo)[0] !== 'type') {
          if (nodo && !nodo.children) {
            this.SeleccionarRubro(nodo);
          }
        }
      }
    });

    // Seleccionar Meta (Editar o Actividades)
    this.subscription5$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
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
    this.subscription6$ = this.store.select(getAccionTabla).subscribe(() => {
      this.store.dispatch(SeleccionarMeta(null));
    });
  }
  
    // Cargar Lineamientos y fuente de recurso
    // this.subscription2$ = combineLatest([
    //   this.store.select(getFuenteRecursoSeleccionada),
    //   this.store.select(getLineamientos),
    // ]).subscribe(([fuente, lineamientos]) => {
    //   if (fuente && lineamientos) {
    //     this.fuenteRecurso = fuente.Codigo;
    //     if (Object.keys(lineamientos[0][0]).length !== 0) {
    //       this.Lineamientos = lineamientos[0];
    //     } else {
    //       this.Lineamientos = [];
    //     }
    //   }
    // });
    // Consultar Metas, Cargar rubro y lineamiento seleccionado
    // this.subscription3$ = combineLatest([
    //   this.store.select(getRubroSeleccionado),
    //   this.store.select(getLineamientoSeleccionado),
    // ]).subscribe(([rubro, lineamiento]) => {
    //   if (rubro && lineamiento) {
    //     this.store.dispatch(ConsultarMetas({
    //       Lineamiento: lineamiento,
    //       Rubro: rubro,
    //     }));
    //   }
    //   if (rubro) {
    //     this.rubroSeleccionado = rubro;
    //   }
    //   if (lineamiento) {
    //     this.LineamientoSeleccionado = this.Lineamientos.find((elemento) => lineamiento.Id === elemento.Id);
    //   }
    // });


  // SeleccionarLineamiento(lineamiento: any) {
  //   this.store.dispatch(SeleccionarLineamiento(lineamiento));
  // }
  SeleccionarRubro(rubro: any) {
    this.store.dispatch(SeleccionarRubro(rubro));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
    this.subscription5$.unsubscribe();
    this.subscription6$.unsubscribe();
  }
}
