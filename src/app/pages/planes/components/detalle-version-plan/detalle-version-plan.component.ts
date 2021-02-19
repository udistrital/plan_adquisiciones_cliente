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
import { CONFIGURACION_TABLA_DETALLE_PLAN_2 } from '../../interfaces/interfaces';
import { getPlanSeleccionado, getVersionPlan } from '../../selectors/planes.selectors';
import { PlanesService } from '../../services/planes.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TimeRangePipe } from '../../../../shared/pipes/time-range.pipe';
import { CurrencyPipe } from '@angular/common';

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


  constructor(
    private store: Store<any>,
    private route: Router,
    private sharedService: SharedService,
    private planesService: PlanesService,
    private datePipe: TimeRangePipe,
    private currencyPipe: CurrencyPipe,
  ) {
  }

  ngOnInit() {
    // lectura de Datos con fuentes de Recurso para renderizacion
    this.subscription$ = this.store.select(getVersionPlan).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.AjustarDatos(plan['registroplanadquisiciones']);
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
    this.sharedService.RetornarAlInicio('planes', 'pages/plan-adquisiciones/planes/tabla-general');

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

    this.PDFPublicado = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [30, 30, 30, 30],
      content: [
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
            ],
          }
        }
      ],
      styles: {
        body: {
          marginTop: 80,
        },
        general_font: {
          fontSize: 6,
          alignment: 'justify',
          margin: [25, 0, 25, 0],
        },
        general_list: {
          fontSize: 6,
          alignment: 'justify',
          margin: [35, 0, 25, 0],
        },
        topHeader: {
          margin: [5, 0, 5, 0],
          alignment: 'justify',
          fontSize: 6,
        },
        table: {
          margin: [30, 0, 30, 0],
          border: '0',
        },
        tableInfo: {
          fontSize: 6,
        },
        table2: {
          margin: [25, 0, 25, 0],
          border: '0',
          fontSize: 6,
        },
        style_1: {
          fillColor: '#1792CA',
          color: '#ffffff',
          bold: true,
          fontSize: 6,
        },
        style_2: {
          fillColor: '#eeeeee',
          bold: true,
          fontSize: 6,
        },
        style_3: {
          fillColor: '#FECE30',
          bold: true,
          fontSize: 6,
        },
        style_4: {
          fillColor: '#F09102',
          bold: true,
          fontSize: 6,
        },
        style_5: {
          fillColor: '#C0F20C',
          bold: true,
          fontSize: 6,
        },
        style_6: {
          fillColor: '#E60077',
          bold: true,
          fontSize: 6,
        },
        style_7: {
          // fillColor: '#E60077',
          // bold: true,
          fontSize: 6,
        }
      }
    };
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
          text: 'Septima Edicion',
          colSpan: 9,
          alignment: 'right',
          border: [false, false, false, false],
          style: 'style_1'
        },
        {}, {}, {}, {}, {}, {}, {}, {}
      ],
      [
        {
          text: '',
          colSpan: 9,
          border: [false, false, false, false],
        },
        {}, {}, {}, {}, {}, {}, {}, {}
      ],
    );
    this.AgregarFuentes();
    this.PDFPublicado.content[0].table.body.push(
      [
        {
          text: '',
          colSpan: 9,
          border: [false, false, false, false],
        },
        {}, {}, {}, {}, {}, {}, {}, {}
      ],
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
        [
          {
            text: 'Codigo UNSPSC',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Rubro Presupuestal',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Actividad',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Fecha Estimada de Inicio de Proceso de seleccion',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Duracion Estimada del Contrato',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Responsable Formulacion del Estudio de Conveniencia y Oportunidad',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Modalidad de Seleccion',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Valor Asignado',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          },
          {
            text: 'Fuente de Recursos',
            alignment: 'center',
            border: [true, true, true, false],
            style: 'style_2'
          }
        ],
      );
      this.AgregarRubros(fuente.datos);
      this.SumaFuente(fuente.datos, fuente.FuenteData);
      this.PDFPublicado.content[0].table.body.push(
        [
          {
            text: '',
            colSpan: 9,
            border: [false, false, false, false],
          },
          {}, {}, {}, {}, {}, {}, {}, {}
        ],
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
        ],
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
              text: this.currencyPipe.transform(renglon.ValorActividad),
              style: 'style_7',
              alignment: 'center',
            },
            {
              text: renglon.FuenteFinanciamientoData.Nombre,
              style: 'style_7',
              alignment: 'center',
            },
          ],
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
            alignment: 'center',
          },
          {
            text: this.ExtraerFuentesFinanciamiento(actividad, true),
            style: 'style_7',
            alignment: 'center',
          },
        ],

      );
    });
  }
  MontarElementosArka(Renglon: any, index: any, length) {
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
      return codigo.Descripcion.split('-')[0] + ' ';
    });
    return datos.reduce((a: any, c: any) => a + '' + c);
  }
  ExtraerFecha(Renglon: any, type: any) {
    const datos = {
      start: new Date(Renglon.FechaEstimadaInicio),
      end: new Date(Renglon.FechaEstimadaFin),
    };
    return this.datePipe.transform(datos, type);
  }
  ExtraerModalidades(Renglon: any) {
    const datos: any = Renglon['registro_funcionamiento-modalidad_seleccion'].map((codigo: any) => {
      return codigo.Nombre + '  ';
    });
    return datos.reduce((a: any, c: any) => a + '  ' + c);
  }
  ExtraerFuentesFinanciamiento(Actividad: any, tipo: boolean) {
    const datos: any = Actividad.FuentesFinanciamiento.map((fuente: any) => {
      if (tipo) {
        return fuente.Nombre + ' ';
      } else {
        return this.currencyPipe.transform(fuente.ValorAsignado) + ' ';
      }
    });
    return datos.reduce((a: any, c: any) => a + '' + c);
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
          text: this.currencyPipe.transform(this.planesService.SacarSumaRubro(Renglones)),
          alignment: 'right',
          style: 'style_1'
        },
        {
          text: '',
          style: 'style_1'

        }
      ],
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
          text: this.currencyPipe.transform(this.planesService.SacarSumaFuente(Rubros)),
          alignment: 'right',
          style: 'style_1'
        },
        {
          text: '',
          style: 'style_1'
        }
      ],
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
          text: this.currencyPipe.transform(this.TotalPlan),
          alignment: 'right',
          style: 'style_1'
        },
        {
          text: '',
          style: 'style_1'
        }
      ],
    );
  }
}
