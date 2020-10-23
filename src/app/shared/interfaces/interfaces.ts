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
            title: 'Consecutivo',
            pipe: {
                functionPipe: (data: string) => {
                    return data + ' ' + data;
                },
                class: 'text-uppercase'
            }
        },
        {
            key: 'nombre',
            title: 'Nombre',
            pipe: {
                functionPipe: (data: string) => {
                    return data + ' ' + data;
                },
                class: 'text-uppercase'
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
    },
    {
        id: 2,
        nombre: 'Manuel',
    },
    {
        id: 3,
        nombre: 'Murillo',
    },
    {
        id: 4,
        nombre: 'Yara',
    },
];
