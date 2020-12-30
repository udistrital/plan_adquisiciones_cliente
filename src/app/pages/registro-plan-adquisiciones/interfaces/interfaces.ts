export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'Codificacion ARKA (UNSPSC)',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Descripcion',
            title: {
                name: 'Codigo',
                class: 'text-center',
            },
            pipe: {
                type: 'custom',
                config: [
                    (data: any) => {
                        return data.split('-')[0];
                    }
                ],
                class: 'text-center',
            }
        },
        {
            key: 'Nombre',
            title: {
                name: 'Descripcion',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },

    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'Editar',
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                title: 'Editar Elemento',
            },
            {
                name: 'Eliminar',
                icon: 'fas fa-trash',
                class: 'p-2',
                title: 'Eliminar Elemento',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2 mx-2',
            title: 'Agregar Elemento',
        },
    ],
    noData: {
        name: 'No Existen Productos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_PRUEBA_2: any = {
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'ActividadId',
            title: {
                name: 'Actividades',
                class: 'text-center',
            },
            pipe: {
                class: '',
            },
            objectKeys: [
                {
                    key: 'Id',
                    title: {
                        name: 'Numero',
                        class: 'text-center',
                    },
                    pipe: {
                        class: '',
                    }
                },
                {
                    key: 'Nombre',
                    title: {
                        name: 'Nombre',
                        class: 'text-center',
                    },
                    pipe: {
                        class: '',
                    }
                },
                {
                    key: 'Valor',
                    title: {
                        name: 'Valor',
                        class: 'text-center',
                    },
                    pipe: {
                        type: 'currency',
                        config: [],
                        class: '',
                    }
                },
            ]
        },
        {
            key: 'FuentesFinanciamiento',
            title: {
                name: 'Fuentes de Funcionamiento',
                class: 'text-center',
            },
            pipe: {
                class: '',
            },
            compound: [
                {
                    key: 'Codigo', // object key
                    title: {
                        name: 'Codigo',
                        class: 'text-center',
                    },
                    pipe: {
                        class: ''
                    },
                },
                {
                    key: 'Nombre', // object key
                    title: {
                        name: 'Nombre',
                        class: 'text-center',
                    },
                    pipe: {
                        class: ''
                    },
                },
                {
                    key: 'Porcentaje', // object key
                    title: {
                        name: '%',
                        class: 'text-center',
                    },
                    pipe: {
                        type: 'percent',
                        config: [
                            '1.2-2'
                        ],
                        class: ''
                    },
                },
                {
                    key: 'Valor', // object key
                    title: {
                        name: 'Nombre',
                        class: 'text-center',
                    },
                    pipe: {
                        type: 'currency',
                        config: [],
                        class: '',
                    }
                }
            ]
        },
    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'Editar',
                icon: 'fas fa-pencil-alt',
                class: '',
                title: 'Editar Actividad y Fuentes Asociadas',
            },
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Actividad y Fuentes Asociadas',
        }
    ],
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_PRUEBA_4: any = {
    title: {
        name: 'Fuentes de Financiamiento',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Codigo',
            title: {
                name: 'Codigo',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Nombre',
            title: {
                name: 'Descripcion',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Porcentaje',
            title: {
                name: '%',
                class: 'text-center',
            },
            pipe: {
                type: 'percent',
                config: [
                    '1.2-2'
                ],
                class: 'text-center',
            }
        },
        {
            key: 'Valor',
            title: {
                name: 'Valor',
                class: 'text-center',
            },
            pipe: {
                type: 'currency',
                config: [],
                class: 'text-center',
            }
        },

    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'Editar',
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                title: 'Editar Fuente de Financiamiento',
            },
            {
                name: 'Eliminar',
                icon: 'fas fa-trash',
                class: 'p-2',
                title: 'Eliminar Fuente de Financiamiento',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2 mx-2',
            title: 'Agregar Fuente de Financiamiento',
        },
    ],
    noData: {
        name: 'No Existen Fuentes Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_PRUEBA_5: any = {
    title: {
        name: 'FICHA DE ESTADISTICAS BASICAS DE INVERSION Y DE METODOLOGIA GENERAL AJUSTADA',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Meta',
            title: {
                name: 'Meta',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Proceso',
            title: {
                name: 'Proceso',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Magnitud',
            title: {
                name: 'Magnitud',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'UnidadMedida',
            title: {
                name: 'Unidad de Medida',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Descripcion',
            title: {
                name: 'Descripcion',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'editar',
                icon: 'fas fa-pencil-alt',
                class: '',
                title: 'Editar Ficha',
            },
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Nueva Meta',
        }
    ],
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};

export const DATOS_PRUEBA_3: any = [

    {
        ActividadId: {
            Id: 6,
            Numero: 3,
            Nombre: 'Actividad de Prueba para Registro de Fuentes 3',
            FechaCreacion: '2020-12-08 21:11:58.241699 +0000 +0000',
            FechaModificacion: '2020-12-08 21:11:58.241811 +0000 +0000',
            Activo: true,
            MetaId: {
                Id: 3,
                Numero: 1,
                Nombre: 'Meta 1 asociadaghfhg',
                FechaCreacion: '2020-11-17 15:08:55.764593 +0000 +0000',
                FechaModificacion: '2020-11-17 17:46:07.2147 +0000 +0000',
                Activo: true,
                Rubro: '3-01-001-04-05-03-0123',
                LineamientoId: {
                    Id: 1,
                    Numero: 1,
                    Nombre: 'prueba 1',
                    Objetivo: 'objetivo de prueba',
                    FuenteRecursoId: '3-01',
                    CentroGestor: 230,
                    AreaFuncionalId: 1,
                    Vigencia: 2020,
                    FechaCreacion: '2020-11-12 18:47:40.078717 +0000 +0000',
                    FechaModificacion: '2020-11-12 19:27:43.392857 +0000 +0000',
                    Activo: true
                }
            },
            Valor: 23000
        },
        Valor: 23000,
        FuentesFinanciamiento: [
            {
                Vigencia: 2020,
                Nombre: 'Recursos del Balance Estampilla UD Ley 1825 de 2020',
                Descripcion: 'Recursos del Balance Estampilla UD Ley 1825 de 2020',
                FechaCreacion: '0001-01-01T00:00:00Z',
                FechaModificacion: '0001-01-01T00:00:00Z',
                Activo: true,
                Codigo: '2414',
                TipoFuente: null,
                ValorInicial: 20000000000,
                ValorActual: 0,
                Estado: 'distribuida',
                Rubros: {},
                NumeroDocumento: '34689',
                TipoDocumento: 'RESOLUCION',
                UnidadEjecutora: '1',
                Movimientos: {},
                Valor: 23000,
                Porcentaje: 1
            }
        ]
    },
    {
        ActividadId: {
            Id: 1,
            Nombre: 'Actividad 1',
            Valor: 2000000,
        },
        Valor: 2000000,
        FuentesFinanciamiento: [
            {
                Id: 12,
                Nombre: 'Estampilla Universidad Distrital',
                Porcentaje: 50,
                Valor: 1000000,
            },
            {
                Id: 12,
                Nombre: 'Estampilla Universidad Distrital',
                Porcentaje: 50,
                Valor: 1000000,
            },
        ]
    },
];

export const DATOS_PRUEBA: any = [
    {
        Id: 1,
        Nombre: 'Licitación Pública',
        Descripcion: '',
        CodigoAbreviacion: '',
        Estado: true,
        NumeroOrden: '1.00'
    },
    {
        Id: 2,
        Nombre: 'Selección Abreviada',
        Descripcion: '',
        CodigoAbreviacion: '',
        Estado: true,
        NumeroOrden: '2.00'
    },
];

export const DATOS_PRUEBA_2: any = [
    {
        Codigo: '43211507',
        Nombre: 'Computadores de Escritorio',
    },
    {
        Codigo: '43212104',
        Nombre: 'Impresoras de Inyeccion de Tinta',
    },
    {
        Codigo: '43212114',
        Nombre: 'Impresoras de Inyeccion',
    },
];

export const DATOS_PRUEBA_4: any = [
    {
        Id: 12,
        Nombre: 'Estampilla Universidad Distrital',
        Porcentaje: 50,
        Valor: 1000000,
    },
    {
        Id: 12,
        Nombre: 'Estampilla Universidad Distrital',
        Porcentaje: 50,
        Valor: 1000000,
    },
];

export const DATOS_PRUEBA_5: any = [
    {
        Meta: 1,
        Proceso: 'Jhoan',
        Magnitud: 'sdfdfdf',
        UnidadMedida: 'Jhoan',
        Descripcion: 'sdfdfdf',
    },
    {
        Meta: 2,
        Proceso: 'Jhoan',
        Magnitud: 'sdfdfdf',
        UnidadMedida: 'Jhoan',
        Descripcion: 'sdfdfdf',
    },
    {
        Meta: 3,
        Proceso: 'Jhoan',
        Magnitud: 'sdfdfdf',
        UnidadMedida: 'Jhoan',
        Descripcion: 'sdfdfdf',
    },
    {
        Meta: 4,
        Proceso: 'Jhoan',
        Magnitud: 'sdfdfdf',
        UnidadMedida: 'Jhoan',
        Descripcion: 'sdfdfdf',
    },
];
