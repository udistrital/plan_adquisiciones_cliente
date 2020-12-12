export const configTable: any = {
    title: {
        name: 'string', // name title
        class: 'string', // bootstrap class
    },
    showColumnTitle: true, // show / hide columns title
    checkElement: {
        title: 'string', // column title
        pipe: {
            type: 'string', // date, currency, decimal, percent, custom ( optional )
            config: [
                'string', // array like pipe, no custom
                () => { }, // only custom pipe
            ], //  ( optional )
            class: 'string', // bootstrap class
        }
    },
    dataConfig: [
        {
            key: 'string', // object key
            title: 'string', // column title
            pipe: {
                type: 'string', // date, currency, decimal, percent, custom ( optional )
                config: [
                    'string', // array like pipe, no custom
                    () => { }, // only custom pipe
                ], //  ( optional )
                class: 'string', // bootstrap class
            },
            compound: [
                {
                    key: 'string', // object key
                    title: 'string', // column title
                    pipe: {
                        type: 'string', // date, currency, decimal, percent, custom ( optional )
                        config: [
                            'string', // array like pipe, no custom
                            () => { }, // only custom pipe
                        ], //  ( optional )
                        class: 'string', // bootstrap class
                    },
                }
            ],
            objectKeys: [
                {
                    key: 'string', // object key
                    title: 'string', // column title
                    pipe: {
                        type: 'string', // date, currency, decimal, percent, custom ( optional )
                        config: [
                            'string', // array like pipe, no custom
                            () => { }, // only custom pipe
                        ], //  ( optional )
                        class: 'string', // bootstrap class
                    },
                }
            ]
        }
    ],
    subtitle: {
        name: 'string', // name subtitle
        class: 'string', // bootstrap class
    },
    rowActions: {
        title: {
            name: 'string', // Title Actions
            class: 'string', // bootstrap class
        },
        actions: [
            {
                name: 'string', // name action
                icon: 'string', // icon action (font-awesome icons)
                class: 'string', // bootstrap class
                title: 'string', // bootstrap tooltip name
            }
        ],
    },
    tableActions: [
        {
            name: 'string', // name action
            icon: 'string', // icon action (font-awesome icons)
            class: 'string', // bootstrap class
            title: 'string', // bootstrap tooltip name
        }
    ],
    noData: {
        name: 'string', // title no data
        class: 'string', // bootstrap class
    },
    endSubtotal: {
        property: 'string', // key object
        items: [
            {
                colspan: 'number', // relative offset number
                name: 'string', // title item
                class: 'string', // bootstrap class
            },
        ],
        last: {
            name: 'string', // if fixed name ( optional )
            class: 'string',
            pipe: {
                type: 'string', // date, currency, decimal, percent, custom ( optional )
                config: [
                    'string', // array like pipe, no custom
                    () => { }, // only custom pipe
                ], //  ( optional )
                class: 'string', // bootstrap class
            }
        }
    },
    sort: 'boolean',
    filter: 'boolean',
};
export const CONFIGURACION_PRUEBA: any = {
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
            key: 'others',
            title: {
                name: 'others',
                class: 'text-center',
            },
            pipe: {
                class: '',
            },
            objectKeys: [
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
            ],
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
            title: 'Agregar Nuevo Lineamiento',
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

