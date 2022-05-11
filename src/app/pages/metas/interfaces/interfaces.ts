export const CONFIGURACION_TABLA_METAS: any = {
  title: {
    class: 'text-center text-light',
    label_i18n: 'metas_asociadas',
  },
  showColumnTitle: true,
  dataConfig: [
    {
      key: 'Numero',
      title: {
        class: 'text-center',
        label_i18n: 'numero',
      },
      pipe: {
        class: '',
      },
    },
    {
      key: 'Nombre',
      title: {
        class: 'text-center',
        label_i18n: 'nombre',
      },
      pipe: {
        class: 'text-justify',
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
        label_i18n: 'editar',
      },
      {
        icon: 'fas fa-list',
        class: 'p-2',
        label_i18n: 'ver_actividades',
      },
    ],
  },
  tableActions: [
    {
      icon: 'fas fa-plus py-1 px-2',
      class: 'px-2',
      label_i18n: 'agregar_nueva_meta',
    },
  ],
  noData: {
    class: 'text-center',
    label_i18n: 'sin_elementos_asociados',
  },
  sort: true,
  filter: true,
};
