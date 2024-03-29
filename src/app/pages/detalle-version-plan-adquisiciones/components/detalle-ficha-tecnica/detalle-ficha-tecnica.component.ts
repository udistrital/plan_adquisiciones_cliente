import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';
import { MetasService } from '../../../metas/services/metas.service';
import { getVersionPlan } from '../../../planes/selectors/planes.selectors';
import { CONFIGURACION_TABLA_FICHA_ESTADISTICA } from '../../../registro-plan-adquisiciones/interfaces/interfaces';

@Component({
  selector: 'ngx-detalle-ficha-tecnica',
  templateUrl: './detalle-ficha-tecnica.component.html',
  styleUrls: ['./detalle-ficha-tecnica.component.scss']
})
export class DetalleFichaTecnicaComponent implements OnInit, OnDestroy {

  @Input() datos: any;
  configuracion: any;
  Datos: any[];
  suscription$: any;

  constructor(
    private store: Store<any>,
    private metaService: MetasService,
    private translateHelper: TranslateFormItemsHelper,
    ) {
      this.Datos = [];
    }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }

  ngOnInit() {
    const configuracion_tabla_ficha_estadistica = this
      .translateTableConfiguracion(CONFIGURACION_TABLA_FICHA_ESTADISTICA);
    this.configuracion = JSON.parse(JSON.stringify(configuracion_tabla_ficha_estadistica));
    delete this.configuracion.rowActions;
    delete this.configuracion.tableActions;
    this.configuracion.dataConfig[0].pipe.config[0] = (data: any) => {
      return data.Numero;
    };

    this.suscription$ = this.store.select(getVersionPlan).subscribe((version: any) => {
      this.metaService.getMetasRubro(this.datos.RubroId).subscribe((metas: any) => {
        this.MontarFicha(
          metas,
          (version['fichaebimga'] as Array<any>).filter((x: any) => x.rubro === this.datos.RubroId)
        );
      });
    });
  }

  private translateTableConfiguracion(conf: any): any {
    return this.translateHelper.translateItemTableConfiguration(conf);
  }

  MontarFicha(metas: any, ficha: any) {

    this.Datos = (ficha as Array<any>).map((element: any) => {
      return {
        Id: element.id,
        MetaId: element.metaid,
        Meta: metas.find((x: any) => x.Id === element.metaid),
        Proceso: element.proceso,
        Magnitud: element.magnitud,
        UnidadMedida: element.unidadmedida,
        Descripcion: element.descripcion,
        Activo: element.activo,
        Rubro: element.rubro,
        PlanAdquisicionesId: element.planadquisicionesid,
        FechaCreacion: element.fechacreacion,
        FechaModificacion: element.fechamodificacion,
      };
    });
  }

}
