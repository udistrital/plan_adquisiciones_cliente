import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getArbolRubro, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarRenglonVersion } from '../../actions/planes.actions';
import { COLUMNAS_PLAN, CONFIGURACION_TABLA_DETALLE_PLAN_2, ESPACIO_TABLA, PLANTILLA_TABLA } from '../../interfaces/interfaces';
import { getPlanSeleccionado, getVersionesPlan, getVersionPlan } from '../../selectors/planes.selectors';
import { PlanesService } from '../../services/planes.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TimeRangePipe } from '../../../../shared/pipes/time-range.pipe';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrdinalPipePipe } from '../../../../shared/pipes/ordinal-pipe.pipe';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-detalle-version-plan',
  templateUrl: './detalle-version-plan.component.html',
  styleUrls: ['./detalle-version-plan.component.scss']
})
export class DetalleVersionPlanComponent implements OnInit, OnDestroy {

  configuracion: any[];
  configTotal: any;
  datos: any[];
  publicar: any;

  subscription$: any;
  subscription2$: any;
  subscription3$: any;
  subscription4$: any;
  Plan: any;
  TotalPlan: any;
  PlanAdquisiciones: any;
  PDFPublicado: any;
  index: any;


  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
    private planesService: PlanesService,
    private timeRangePipe: TimeRangePipe,
    private currencyPipe: CurrencyPipe,
    private ordinalPipe: OrdinalPipePipe,
    private titlepipe: TitleCasePipe,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    // lectura de Datos con fuentes de Recurso para renderizacion
    this.subscription$ = combineLatest([
      this.store.select(getVersionPlan),
      this.store.select(getVersionesPlan),
    ]).subscribe(([plan, versiones]) => {
      if (this.sharedService.IfStore(plan) && this.sharedService.IfStore(versiones)) {
        this.AjustarDatos(plan['registroplanadquisiciones']);
        this.index = versiones[0].findIndex((x: any) => x._id === plan._id) + 1;
        this.Plan = versiones[0].find((x: any) => x._id === plan._id);

      }
    });
    this.subscription2$ = this.store.select(getPlanSeleccionado).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.PlanAdquisiciones = plan;
      }
    });
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.name === 'Ver') {
          this.store.dispatch(LoadFilaSeleccionada(null));
          this.store.dispatch(CargarRenglonVersion(accion.fila));
          this.route.navigate(['pages/plan-adquisiciones/detalle-version-plan-adquisiciones']);
        }
      }
    });
    this.sharedService.RetornarAlInicio2('planes.Versiones', 'pages/plan-adquisiciones/planes/tabla-general');

  }

  AjustarDatos(datos: any) {

    const conf = JSON.parse(JSON.stringify(CONFIGURACION_TABLA_DETALLE_PLAN_2));
    conf.rowActions.actions = [
      {
        name: 'Ver',
        icon: 'fas fa-list',
        class: 'p-2',
        title: 'Ver Version',
      },
    ];
    this.configuracion = conf;
    this.datos = datos;
    this.TotalPlan = this.planesService.SacarTotalPlan(datos);
  }


  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    // this.subscription4$.unsubscribe();
  }


  // Creacion de PDF
  DescargarPDF() {
    this.CrearPDFPublicacion();
    const data = this.PDFPublicado;
    pdfMake.createPdf(data).download();
  }

  // Plantilla General
  CrearPDFPublicacion() {

    this.PDFPublicado = JSON.parse(JSON.stringify(PLANTILLA_TABLA));
    // Titulo General
    this.PDFPublicado.content[0].table.body.push(
      [
        {
          text: `PLAN DE ADQUISICIONES DE BIENES Y SERVICIOS DE LA UNIVERSIDAD DISTRITAL VIGENCIA ${this.PlanAdquisiciones.Vigencia}`,
          colSpan: 9,
          alignment: 'center',
          border: [false, false, false, false],
          style: 'style_1'
        },
        {}, {}, {}, {}, {}, {}, {}, {}
      ],
      [
        {
          text: '',
          colSpan: 9,
          alignment: 'center',
          border: [false, false, false, false],
          style: 'style_1'
        },
        {}, {}, {}, {}, {}, {}, {}, {}
      ],
      [
        {
          text: this.ordinalPipe.transform(this.index) +
            ' Edicion\n' +
            this.titlepipe.transform(
              this.datePipe.transform(this.Plan.fechacreacion, 'medium')
            ),
          colSpan: 9,
          alignment: 'right',
          border: [false, false, false, false],
          style: 'style_1'
        },
        {}, {}, {}, {}, {}, {}, {}, {}
      ],
      ESPACIO_TABLA
    );
    this.AgregarFuentes();
    this.PDFPublicado.content[0].table.body.push(
      ESPACIO_TABLA
    );
    this.SumaTotal();
  }
  // Agregando Fuentes
  AgregarFuentes() {
    this.datos.forEach((fuente: any) => {
      this.PDFPublicado.content[0].table.body.push(
        [
          {
            text: fuente.FuenteData.Nombre,
            colSpan: 9,
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {}, {}, {}, {}, {}, {}, {}, {}
        ],
        JSON.parse(JSON.stringify(COLUMNAS_PLAN))
      );
      this.AgregarRubros(fuente.datos);
      this.SumaFuente(fuente.datos, fuente.FuenteData);
      this.PDFPublicado.content[0].table.body.push(
        ESPACIO_TABLA
      );
    });
  }
  // Agregando Rubros
  AgregarRubros(Rubros: any) {
    Rubros.forEach((rubro: any) => {
      this.PDFPublicado.content[0].table.body.push(
        [
          {
            text: rubro.RubroInfo.Descripcion,
            colSpan: 9,
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_3'
          },
          {}, {}, {}, {}, {}, {}, {}, {}
        ]
      );
      this.AgregarRenglones(rubro.datos, rubro.RubroInfo);
      this.SumaRubro(rubro.datos, rubro.RubroInfo);
    });
  }
  // Agregando Renglones
  AgregarRenglones(Renglones: any, Rubro: any) {
    Renglones.forEach((renglon: any) => {
      if (renglon.FuenteFinanciamientoId === '') {
        this.AjustarActividades(renglon, renglon['registro_plan_adquisiciones-actividad'], Rubro);
      } else {
        this.PDFPublicado.content[0].table.body.push(
          [
            {
              text: this.ExtraerCodigosArka(renglon),
              alignment: 'center',
              style: 'style_7',
            },
            {
              text: Rubro.Codigo,
              style: 'style_7',
              alignment: 'center',
            },
            {
              text: renglon.ActividadData.Nombre,
              style: 'style_7',
              alignment: 'justify',
            },
            {
              text: renglon.ResponsableNombre,
              style: 'style_7',
              alignment: 'center',
            },
            {
              text: this.ExtraerFecha(renglon, 'limits'),
              style: 'style_7',
              alignment: 'center',
            },
            {
              text: this.ExtraerFecha(renglon, 'range'),
              style: 'style_7',
              alignment: 'center',
            },
            {
              text: this.ExtraerModalidades(renglon),
              style: 'style_7',
              alignment: 'center',
            },
            {
              text: this.currencyPipe.transform(renglon.ValorActividad, '$'),
              style: 'style_7',
              alignment: 'right',
            },
            {
              text: renglon.FuenteFinanciamientoData.Nombre,
              style: 'style_7',
              alignment: 'left',
            },
          ]
        );
      }
    });
  }

  // Desagregando Actividades
  AjustarActividades(Renglon: any, Actividades: any, Rubro) {
    Actividades.forEach((actividad: any, index: any) => {
      const datosArka = this.MontarElementosArka(Renglon, index, Actividades.length);
      this.PDFPublicado.content[0].table.body.push(
        [
          datosArka,
          {
            text: Rubro.Codigo,
            style: 'style_7',
            alignment: 'center',
          },
          {
            text: actividad.Numero + '.' + actividad.NumeroMeta + ' ' + actividad.Nombre,
            style: 'style_7',
            alignment: 'justify',
          },
          {
            text: Renglon.ResponsableNombre,
            style: 'style_7',
            alignment: 'center',
          },
          {
            text: this.ExtraerFecha(Renglon, 'limits'),
            style: 'style_7',
            alignment: 'center',
          },
          {
            text: this.ExtraerFecha(Renglon, 'range'),
            style: 'style_7',
            alignment: 'center',
          },
          {
            text: this.ExtraerModalidades(Renglon),
            style: 'style_7',
            alignment: 'center',
          },
          {
            text: this.ExtraerFuentesFinanciamiento(actividad, false),
            style: 'style_7',
            alignment: 'right',
          },
          {
            text: this.ExtraerFuentesFinanciamiento(actividad, true),
            style: 'style_7',
            alignment: 'left',
          },
        ]
      );
    });
  }
  MontarElementosArka(Renglon: any, index: any, length: any) {
    if (index === 0) {
      return {
        text: this.ExtraerCodigosArka(Renglon),
        alignment: 'center',
        style: 'style_7',
        rowSpan: length,
      };
    } else {
      return {
        text: '',
      };
    }
  }

  ExtraerCodigosArka(Renglon: any) {
    const datos: any = Renglon['registro_plan_adquisiciones-codigo_arka'].map((codigo: any) => {
      return codigo.Descripcion.split('-')[0];
    });
    return datos.reduce((a: any, c: any) => a + '\n' + c);
  }
  ExtraerFecha(Renglon: any, type: any) {
    const datos = {
      start: new Date(Renglon.FechaEstimadaInicio),
      end: new Date(Renglon.FechaEstimadaFin),
    };
    return this.titlepipe.transform(this.timeRangePipe.transform(datos, type));
  }
  ExtraerModalidades(Renglon: any) {
    const datos: any = Renglon['registro_funcionamiento-modalidad_seleccion'].map((codigo: any) => {
      return codigo.Nombre;
    });
    return datos.reduce((a: any, c: any) => a + '\n' + c);
  }
  ExtraerFuentesFinanciamiento(Actividad: any, tipo: boolean) {
    const datos: any = Actividad.FuentesFinanciamiento.map((fuente: any) => {
      if (tipo) {
        return fuente.Nombre;
      } else {
        return this.currencyPipe.transform(fuente.ValorAsignado, '$');
      }
    });
    return datos.reduce((a: any, c: any) => a + '\n' + c);
  }
  SumaRubro(Renglones: any, Rubro: any) {
    this.PDFPublicado.content[0].table.body.push(
      [
        {
          text: 'Total Rubro ' + Rubro.Nombre,
          alignment: 'center',
          colSpan: 7,
          style: 'style_1'

        }, {}, {}, {}, {}, {}, {},
        {
          text: this.currencyPipe.transform(this.planesService.SacarSumaRubro(Renglones), '$'),
          alignment: 'right',
          style: 'style_1'
        },
        {
          text: '',
          style: 'style_1'

        }
      ]
    );
  }
  SumaFuente(Rubros: any, Fuente: any) {
    this.PDFPublicado.content[0].table.body.push(
      [
        {
          text: 'TOTAL PLAN ' + Fuente.Nombre,
          alignment: 'center',
          colSpan: 7,
          style: 'style_1'

        }, {}, {}, {}, {}, {}, {},
        {
          text: this.currencyPipe.transform(this.planesService.SacarSumaFuente(Rubros), '$'),
          alignment: 'right',
          style: 'style_1'
        },
        {
          text: '',
          style: 'style_1'
        }
      ]
    );
  }
  SumaTotal() {
    this.PDFPublicado.content[0].table.body.push(
      [
        {
          text: `PLAN DE ADQUISICIONES DE BIENES Y SERVICIOS DE LA UNIVERSIDAD DISTRITAL VIGENCIA ${this.PlanAdquisiciones.Vigencia}`,
          alignment: 'center',
          colSpan: 7,
          style: 'style_1'

        }, {}, {}, {}, {}, {}, {},
        {
          text: this.currencyPipe.transform(this.TotalPlan, '$'),
          alignment: 'right',
          style: 'style_1'
        },
        {
          text: '',
          style: 'style_1'
        }
      ]
    );
  }
}
