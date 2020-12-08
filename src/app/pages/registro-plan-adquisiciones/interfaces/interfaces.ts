export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'Codificacion ARKA (UNSPSC)',
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
                    key: 'Id', // object key
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
            key: 'Id',
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

export const DATOS_PRUEBA_3: any = [
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
