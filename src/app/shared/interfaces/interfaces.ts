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

export interface ArbolRubros<T> {
    Codigo: string;
    data?: T;
    children?: ArbolRubros<T>[];
    expanded?: boolean;
}
export interface DatosNodo {
    Codigo: string;
    Descripcion?: string;
    ValorInicial?: number;
    Hijos?: any[];
    Movimientos?: string[];
    Padre?: string;
    UnidadEjecutora?: number;
    Estado?: string;
    IsLeaf?: boolean;
}

export const OPCIONES_AREA_FUNCIONAL = [
    {
        Id: 1,
        Nombre: 'Rector',
        label: '01 - Rector',
    },
    {
        Id: 2,
        Nombre: 'Convenio',
        label: '02 - Convenio',
    }

];
