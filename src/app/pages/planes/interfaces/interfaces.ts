export const CONFIGURACION_TABLA_PLANES_DE_ADQUISICIONES: any = {
    title: {
        name: 'PLANES DE ADQUISICIONES',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
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
                type: 'date',
                config: [
                    'shortDate',
                ],
                class: 'text-center',
            }
        },
        {
            key: 'Publicado',
            title: {
                name: 'Publicado',
                class: 'text-center',
            },
            pipe: {
                isBoolean: true,
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
            },
            {
                name: 'Versiones',
                icon: 'fas fa-code-branch',
                class: 'p-2',
                title: 'Ver Versiones',
            },
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
    sort: true,
    filter: true,
};

export const CONFIGURACION_TABLA_VERSIONES_PLAN: any = {
    title: {
        name: '',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'index',
            title: {
                name: 'Version',
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
                name: 'Ver',
                icon: 'fas fa-list',
                class: 'p-2',
                title: 'Ver Plan de Adquisiciones',
            },
        ],
    },
    noData: {
        name: 'No Existen Versiones',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};


export const CONFIGURACION_TABLA_DETALLE_PLAN_2: any = {
    title: {
        name: '',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'RubroId',
            title: {
                name: 'Rubro Presupuestal',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'RubroNombre',
            title: {
                name: 'Descripcion',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-justify align-middle',
            }
        },
        {
            key: 'FechaEstimada',
            title: {
                name: 'Fecha Estimada de Inicio de Proceso de Seleccion',
                class: 'text-center align-middle',
            },
            pipe: {
                type: 'time-range',
                config: ['limits'],
                class: 'text-center align-middle',
            }
        },
        {
            key: 'FechaEstimada',
            title: {
                name: 'Duracion Estimada de Contrato',
                class: 'text-center align-middle',
            },
            pipe: {
                type: 'time-range',
                config: ['range'],
                class: 'text-center align-middle',
            }
        },
        {
            key: 'ResponsableNombre',
            title: {
                name: 'Responsable Formulacion del Estudio de Conveniencia y Oportunidad',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'ModalidadSeleccion',
            title: {
                name: 'Modalidad de Seleccion',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'd-flex flex-column align-items-center text-center align-middle',
                isArray: true,
            }
        },
        {
            key: 'ValorTotalActividades',
            title: {
                name: 'Valor Asignado Año Vigente',
                class: 'text-center align-middle',
            },
            pipe: {
                type: 'currency',
                config: [
                ],
                class: 'text-center align-middle',
            }
        },
        {
            key: 'FuenteRecursosNombre',
            title: {
                name: 'Fuente de Recurso',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
    ],
    // subtitle: {
    //     name: '',
    //     class: 'text-center text-light',
    // },
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center align-middle',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'Editar',
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                title: 'Editar Datos Rubro',
            },
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2 mx-2',
            title: 'Agregar Rubro',
        },
    ],
    noData: {
        name: 'No Existen Rubros Asociados',
        class: 'text-center',
    },
    // endSubtotal: {
    //     property: 'Valor',
    //     items: [
    //         {
    //             colspan: 6,
    //             name: 'Total Plan',
    //             class: 'text-center',
    //         },
    //     ],
    //     last: {
    //         class: 'text-left',
    //         pipe: {
    //             type: 'currency',
    //             config: [
    //             ],
    //             class: '',
    //         }
    //     }
    // },
    sort: true,
    filter: false,
};
