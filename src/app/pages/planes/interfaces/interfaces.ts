export const CONFIGURACION_TABLA_PLANES_DE_ADQUISICIONES: any = {
  title: {
    class: 'text-center text-light',
    label_i18n: 'planes_adquisiciones',
  },
  showColumnTitle: true,
  dataConfig: [
    {
      key: 'Id',
      title: {
        class: 'text-center',
        label_i18n: 'consecutivo',
      },
      pipe: {
        class: '',
      },
    },
    {
      key: 'Descripcion',
      title: {
        class: 'text-center',
        label_i18n: 'nombre',
      },
      pipe: {
        class: 'text-justify',
      },
    },
    {
      key: 'Vigencia',
      title: {
        class: 'text-center',
        label_i18n: 'vigencia',
      },
      pipe: {
        class: 'text-center',
      },
    },
    {
      key: 'FechaCreacion',
      title: {
        class: 'text-center',
        label_i18n: 'fecha_creacion',
      },
      pipe: {
        type: 'date',
        config: ['shortDate'],
        class: 'text-center',
      },
    },
    {
      key: 'FechaModificacion',
      title: {
        class: 'text-center',
        label_i18n: 'ultima_modificacion',
      },
      pipe: {
        type: 'date',
        config: ['shortDate'],
        class: 'text-center',
      },
    },
    {
      key: 'Publicado',
      title: {
        class: 'text-center',
        label_i18n: 'publicado',
      },
      pipe: {
        isBoolean: true,
        class: 'text-center',
      },
    },
  ],
  rowActions: {
    title: {
      class: 'text-center',
      actionClass: 'd-flex flex-row justify-content-around align-middle',
      label_i18n: 'acciones',
    },
    actions: [
      {
        icon: 'fas fa-pencil-alt',
        class: 'p-2',
        label_i18n: 'editar_datos_iniciales',
      },
      {
        icon: 'fas fa-list',
        class: 'p-2',
        label_i18n: 'ver_plan_adquisiciones',
      },
      {
        icon: 'fas fa-code-branch',
        class: 'p-2',
        label_i18n: 'ver_versiones',
      },
    ],
  },
  tableActions: [
    {
      icon: 'fas fa-plus py-1 px-2',
      class: 'px-2 mx-2',
      label_i18n: 'agregar_nuevo_plan_adquisiciones',
    },
  ],
  noData: {
    class: 'text-center',
    label_i18n: 'sin_planes_creados',
  },
  sort: true,
  filter: true,
};

export const CONFIGURACION_TABLA_VERSIONES_PLAN: any = {
  title: {
    class: 'text-center text-light',
  },
  showColumnTitle: true,
  dataConfig: [
    {
      key: 'index',
      title: {
        class: 'text-center',
        label_i18n: 'version',
      },
      pipe: {
        class: 'text-center',
      },
    },
  ],
  rowActions: {
    title: {
      class: 'text-center',
      actionClass: 'd-flex flex-row justify-content-around align-middle',
      label_i18n: 'acciones',
    },
    actions: [
      {
        icon: 'fas fa-list',
        class: 'p-2',
        label_i18n: 'ver_plan_adquisiciones',
      },
    ],
  },
  noData: {
    class: 'text-center',
    label_i18n: 'sin_versiones',
  },
  sort: true,
  filter: false,
};

export const CONFIGURACION_TABLA_DETALLE_PLAN_2: any = {
  title: {
    class: 'text-center text-light',
  },
  subtitle: {
    class: 'text-center bg-primary text-light', // bootstrap class
  },
  showColumnTitle: true,
  dataConfig: [
    {
      key: 'CodigoArka',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'codigos_unspsc',
      },
      pipe: {
        class: 'text-center align-middle',
        isArray: true,
      },
    },
    {
      key: 'RubroId',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'rubro_presupuestal',
      },
      pipe: {
        class: 'text-center align-middle',
      },
    },
    {
      key: 'Actividades',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'descripcion',
      },
      pipe: {
        class: 'text-justify align-middle',
        isArray: true,
      },
    },
    {
      key: 'FechaEstimada',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'fecha_estimada_inicio_proceso_seleccion',
      },
      pipe: {
        type: 'time-range',
        config: ['limits'],
        class: 'text-center align-middle text-capitalize',
      },
    },
    {
      key: 'FechaEstimada',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'duracion_estimada_contrato',
      },
      pipe: {
        type: 'time-range',
        config: ['range'],
        class: 'text-center align-middle text-capitalize',
      },
    },
    {
      key: 'ResponsableNombre',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'responsable_formulacion_estudio_conveniencia_oportunidad',
      },
      pipe: {
        class: 'text-center align-middle',
      },
    },
    {
      key: 'ModalidadSeleccion',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'modalidad_seleccion',
      },
      pipe: {
        class: 'text-center align-middle',
        isArray: true,
      },
    },
    {
      key: 'ValorTotalActividades',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'valor_asignado_año_vigente',
      },
      pipe: {
        type: 'currency',
        config: ['$', 'symbol', '3.2-2', 'en-US'],
        class: 'text-right align-middle px-0',
      },
    },
    {
      key: 'FuenteRecursos',
      title: {
        class: 'text-center align-middle',
        label_i18n: 'fuente_recurso',
      },
      pipe: {
        class: 'text-center align-middle',
        isArray: true,
      },
    },
  ],
  rowActions: {
    title: {
      name: 'Acciones',
      class: 'text-center align-middle',
      actionClass: 'd-flex flex-row justify-content-around align-middle',
      label_i18n: 'acciones',
    },
    actions: [
      {
        icon: 'fas fa-pencil-alt',
        class: 'p-2',
        label_i18n: 'editar_datos_rubro',
      },
    ],
  },
  noData: {
    class: 'text-center',
    label_i18n: 'sin_rubros_asociados',
  },
  endSubtotal: {
    first: {
      class: 'text-center bg-primary text-light',
    },
    last: {
      class: 'text-right bg-primary text-light px-0',
    },
  },
  sort: true,
  filter: false,
};

export const COLUMNAS_PLAN = [
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'codigo_unspsc',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'rubro_presupuestal',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'actividad',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'responsable_formulacion_estudio_conveniencia_oportunidad',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'fecha_estimada_inicio_proceso_seleccion',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'duracion_estimada_contrato',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'modalidad_seleccion',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'valor_asignado',
  },
  {
    alignment: 'center',
    border: [true, true, true, false],
    style: 'style_2',
    label_i18n: 'fuente_recurso',
  },
];

export const ESPACIO_TABLA = [
  {
    text: '',
    colSpan: 9,
    border: [false, false, false, false],
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

export const PLANTILLA_TABLA = {
  pageSize: 'A4',
  pageOrientation: 'landscape',
  pageMargins: [30, 30, 30, 30],
  content: [
    {
      table: {
        widths: [
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          '*',
          '*',
          'auto',
          'auto',
        ],
        body: [],
      },
    },
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
    },
  },
};
