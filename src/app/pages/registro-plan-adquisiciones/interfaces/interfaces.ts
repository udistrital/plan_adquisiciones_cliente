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
    title: {
        name: 'Titulo de Prueba',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'id',
            title: {
                name: 'Numero',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'nombre',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'arrayTest',
            title: {
                name: 'Array Object Test',
                class: 'text-center',
            },
            pipe: {
                class: '',
            },
            compound: [
                {
                    key: 'label', // object key
                    title: {
                        name: 'Label',
                        class: 'text-center',
                    },
                    pipe: {
                        class: ''
                    },
                },
                {
                    key: 'org', // object key
                    title: {
                        name: 'Org',
                        class: 'text-center',
                    },
                    pipe: {
                        class: ''
                    },
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
                name: 'editar',
                icon: 'fas fa-pencil-alt',
                class: '',
                title: 'Editar',
            },
            {
                name: 'metas',
                icon: 'fas fa-list',
                class: '',
                title: 'Ver Metas',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Actividad',
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
        id: 1,
        nombre: 'Jhoan',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            {
                label: 2,
                org: 'asdfasdfasdf'
            },
        ]
    },
    {
        id: 2,
        nombre: 'Manuel',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            {
                label: 2,
                org: 'asdfasdfasdf'
            },
            {
                label: 2,
                org: 'asdfasdfasdf'
            },
            {
                label: 2,
                org: 'asdfasdfasdf'
            },
        ]
    },
    {
        id: 3,
        nombre: 'Murillo',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            {
                label: 2,
                org: 'asdfasdfasdf'
            },
            {
                label: 2,
                org: 'asdfasdfasdf'
            },
            {
                label: 2,
                org: 'asdfasdfasdf'
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

