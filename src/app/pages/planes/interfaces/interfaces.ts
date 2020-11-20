export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'PLANES DE ADQUISICIONES',
        class: 'text-center text-light',
    },
    showColumnTitle: false,
    dataConfig: [
        {
            key: 'Id',
            title: {
                name: 'Consecutivo',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Descripcion',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                class: 'text-justify',
            }
        },
        {
            key: 'Vigencia',
            title: {
                name: 'Vigencia',
                class: 'text-center',
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'FechaCreacion',
            title: {
                name: 'Fecha de Creacion',
                class: 'text-center',
            },
            pipe: {
                type: 'date',
                config: [
                    'shortDate'
                ],
                class: 'text-center',
            }
        },
        {
            key: 'FechaModificacion',
            title: {
                name: 'Ultima Modificacion',
                class: 'text-center',
            },
            pipe: {
                type: 'currency',
                config: [
                ],
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
                title: 'Editar Datos Iniciales',
            },
            {
                name: 'Ver',
                icon: 'fas fa-list',
                class: 'p-2',
                title: 'Ver Plan de Adquisiciones',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2 mx-2',
            title: 'Agregar Nuevo Plan de Adquisiciones',
        },
    ],
    noData: {
        name: 'No Existen Planes Creados',
        class: 'text-center',
    },
    endSubtotal: {
        property: 'FechaModificacion',
        items: [
            {
                colspan: 4,
                name: 'Subtotal: ',
                class: 'text-right bg-light text-dark',
            },
        ],
        last: {
            class: 'text-left bg-light text-dark',
            pipe: {
                type: 'currency',
                config: [
                ],
                class: '',
            }
        }
    },
    sort: true,
    filter: true,
};
export const DATOS_PRUEBA: any = [
    {
        Id: 1,
        Descripcion: 'Plan cosito',
        Vigencia: 2020,
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaModificacion: '2222222.3',
        Activo: true,
    },
    {
        Id: 2,
        Descripcion: 'Plan cosito 2',
        Vigencia: 2020,
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaModificacion: '2222222.3',
        Activo: true,
    },

    {
        Id: 3,
        Descripcion: 'Plan cosito 3',
        Vigencia: 2020,
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaModificacion: '2222222.3',
        Activo: true,
    },


];
