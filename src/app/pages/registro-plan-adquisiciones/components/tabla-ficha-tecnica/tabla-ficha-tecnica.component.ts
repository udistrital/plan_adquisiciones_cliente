import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { CargarFichaSeleccionada, ConsultarFichaTecnica } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_TABLA_FICHA_ESTADISTICA } from '../../interfaces/interfaces';
import { getFichaTecnica, getRubro } from '../../selectors/registro-plan-adquisiciones.selectors';
import { FormFichaTecnicaComponent } from '../form-ficha-tecnica/form-ficha-tecnica.component';

@Component({
  selector: 'ngx-tabla-ficha-tecnica',
  templateUrl: './tabla-ficha-tecnica.component.html',
  styleUrls: ['./tabla-ficha-tecnica.component.scss']
})
export class TablaFichaTecnicaComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  subscription2$: any;
  subscription3$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private matDialog: MatDialog,
    private metaService: MetasService,
    private translateHelper: TranslateFormItemsHelper,
  ) {

  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }
  ngOnInit() {
    this.translateTableConfiguracion();

    this.subscription$ = combineLatest([
      this.store.select(getPlanSeleccionado),
      this.store.select(getRubro),
    ]).subscribe(([plan, rubro]) => {
      if (this.sharedService.IfStore(plan) && this.sharedService.IfStore(rubro)) {
        this.store.dispatch(ConsultarFichaTecnica({
          PlanAdquisicionesId: plan,
          Rubro: rubro.data.Codigo
        }));

      }
    });

    this.subscription2$ = combineLatest([
      this.store.select(getFichaTecnica),
      this.store.select(getRubro),
    ]).subscribe(([ficha, rubro]) => {
      if (this.sharedService.IfStore(ficha) && this.sharedService.IfStore(rubro)) {
        if (Object.keys(ficha[0][0]).length !== 0) {
          this.metaService.getMetasRubro(rubro.data.Codigo).subscribe((metas) => {
            this.MontarFicha(metas, ficha[0]);
          });
        } else {
          this.datosPrueba = [];
        }
      } else {
        this.datosPrueba = [];
      }
    });

    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion: any) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Editar Ficha') {
          this.store.dispatch(LoadFilaSeleccionada(null));
          this.store.dispatch(CargarFichaSeleccionada(accion.fila));
          this.OpenModal();
        }
      }
    });
    this.subscription4$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Agregar Nueva Meta Asociada') {
          this.store.dispatch(LoadFilaSeleccionada(null));
          this.store.dispatch(CargarFichaSeleccionada(null));
          this.OpenModal();
        }
      }
    });
  }

  private translateTableConfiguracion(): void {
    this.configuracion = CONFIGURACION_TABLA_FICHA_ESTADISTICA;
    this.configuracion = this.translateHelper.translateItemTableConfiguration(this.configuracion);
  }

  OpenModal() {
    this.matDialog.open(FormFichaTecnicaComponent, {
      width: '500px',
    });
  }

  MontarFicha(metas: any, ficha: any) {
    this.datosPrueba = (ficha as Array<any>).map((element: any) => {
      return {
        Id: element.Id,
        MetaId: element.MetaId,
        Meta: metas.find((x: any) => x.Id === element.MetaId),
        Proceso: element.Proceso,
        Magnitud: element.Magnitud,
        UnidadMedida: element.UnidadMedida,
        Descripcion: element.Descripcion,
        Activo: element.Activo,
        Rubro: element.Rubro,
        PlanAdquisicionesId: element.PlanAdquisicionesId,
        FechaCreacion: element.FechaCreacion,
        FechaModificacion: element.FechaModificacion,
      };
    });
  }

}
