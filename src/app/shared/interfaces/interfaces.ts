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
    rowActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    tableActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    sort: 'boolean',
    filter: 'boolean',
};
export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'Tabla de Prueba',
        class: 'text-center',
    },
    dataConfig: [
        {
            key: 'id',
            title: {
                name: 'Consecutivo',
                class: 'text-center',
            },
            pipe: {
                // functionPipe: (data: string) => {
                //     return data + ' ' + data;
                // },
                class: 'text-uppercase'
            }
        },
        {
            key: 'nombre',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                functionPipe: (data: string) => {
                    return data + ' ' + data;
                },
                class: 'text-uppercase'
            }
        },
        {
            key: 'others',
            title: {
                name: 'Otros',
                class: 'text-center',
            },
            pipe: {
                functionPipe: (data: any) => {
                    return data.org;
                },
                class: 'text-uppercase'
            }
        },
        {
            key: 'arrayTest',
            title: {
                name: 'Arreglo',
                class: 'text-center',
            },
            pipe: {
                functionPipe: (data: any) => {
                    return data;
                },
                class: 'd-flex flex-column align-items-center',
                isArray: true,
            }
        },

    ],
    rowActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    tableActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    sort: 'boolean',
    filter: true,
};
export const DATOS_PRUEBA: any = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
