export const configTable: any = {
    title: {
        name: 'string',
        class: 'string',
    },
    dataConfig: [
        {
            key: 'string',
            title: 'string',
            pipe: {
                functionPipe: () => { },
                class: 'string'
            }
        }
    ],
    rowActions: {
        title: {
            name: 'string',
            class: 'string',
        },
        actions: [
            {
                name: 'string',
                icon: 'string',
                class: 'string',
                title: 'string',
            }
        ],
    },
    tableActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    noData: {
        name: 'string',
        class: 'string',
    },
    sort: 'boolean',
    filter: 'boolean',
};
export const CONFIGURACION_PRUEBA: any = {
    // title: {
    //     name: 'Tabla de Prueba',
    //     class: 'text-center',
    // },
    dataConfig: [
        {
            key: 'id',
            title: {
                name: 'Numero',
                class: 'text-center',
            },
            pipe: {
                // functionPipe: (data: string) => {
                //     return data + ' ' + data;
                // },
                // class: 'text-uppercase'
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
                // functionPipe: (data: string) => {
                //     return data + ' ' + data;
                // },
                // class: 'text-uppercase'
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
                class: 'p-2',
                title: 'Editar',
            },
            {
                name: 'metas',
                icon: 'fas fa-list',
                class: 'p-2',
                title: 'Ver Metas',
            }
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
    filter: true,
};
export const DATOS_PRUEBA: any = [
    {
        id: 1.1,
        nombre: 'Jhoan',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
    {
        id: 2.1,
        nombre: 'Manuel',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
    {
        id: 3.1,
        nombre: 'Murillo',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
    {
        id: 4.1,
        nombre: 'Yara',
        others: {
            label: 2,
            org: 'asdfasdfasdf'
        },
        arrayTest: [
            'dasdfasdfasdf',
            'asdfasdfasdfasdf',
            'asdfasdfasdfasdf'
        ]
    },
];
