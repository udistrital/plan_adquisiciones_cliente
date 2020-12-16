export const CONFIGURACION_PRUEBA: any = {
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
    sort: true,
    filter: true,
};
export const DATOS_PRUEBA: any = [
    {
        Id: 1,
        Descripcion: 'Plan cosito',
        Vigencia: 2020,
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaModificacion: '2020-11-20T02:18:54Z',
        Activo: true,
    },
    {
        Id: 2,
        Descripcion: 'Plan cosito 2',
        Vigencia: 2020,
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaModificacion: '2020-11-20T02:18:54Z',
        Activo: true,
    },

    {
        Id: 3,
        Descripcion: 'Plan cosito 3',
        Vigencia: 2020,
        FechaCreacion: '2020-11-20T02:18:54Z',
        FechaModificacion: '2020-11-20T02:18:54Z',
        Activo: true,
    },
];


export const CONFIGURACION_PRUEBA_2: any = {
    title: {
        name: '',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Rubro',
            title: {
                name: 'Rubro Presupuestal',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Descripcion',
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
                class: 'text-center align-middle',
            }
        },
        {
            key: 'DuracionEstimada',
            title: {
                name: 'Duracion Estimada de Contrato',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Responsable',
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
            key: 'Valor',
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
            key: 'FuenteRecurso',
            title: {
                name: 'Fuente de Recurso',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
    ],
    subtitle: {
        name: '',
        class: 'text-center text-light',
    },
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
    endSubtotal: {
        property: 'Valor',
        items: [
            {
                colspan: 6,
                name: 'Total Plan',
                class: 'text-center',
            },
        ],
        last: {
            class: 'text-left',
            pipe: {
                type: 'currency',
                config: [
                ],
                class: '',
            }
        }
    },
    sort: true,
    filter: false,
};

export const DATOS_PRUEBA_2: any = [
    {
        Rubro: '3-01-001-04-05-03-0123',
        Descripcion: 'Compra de Equipos, Computadores, Portatiles, Impresoras y otros',
        FechaEstimada: 'Mayo 2019 - Julio 2019',
        DuracionEstimada: '1 Año',
        Responsable: 'Jefe Oficina Asesora de Sistemas',
        ModalidadSeleccion: [
            'Subasta Inversa',
            'Contratacion Directa',
            'Convocatoria Publica'
        ],
        Valor: 57091000.0,
        FuenteRecurso: 'Funcionamiento',
    },
    {
        Rubro: '3-01-001-04-05-03-0123',
        Descripcion: 'Compra de Equipos, Computadores, Portatiles, Impresoras y otros',
        FechaEstimada: 'Mayo 2019 - Julio 2019',
        DuracionEstimada: '1 Año',
        Responsable: 'Jefe Oficina Asesora de Sistemas',
        ModalidadSeleccion: [
            'Subasta Inversa',
            'Contratacion Directa',
            'Convocatoria Publica'
        ],
        Valor: 57091000.0,
        FuenteRecurso: 'Funcionamiento',
    },
    {
        Rubro: '3-01-001-04-05-03-0123',
        Descripcion: 'Compra de Equipos, Computadores, Portatiles, Impresoras y otros',
        FechaEstimada: 'Mayo 2019 - Julio 2019',
        DuracionEstimada: '1 Año',
        Responsable: 'Jefe Oficina Asesora de Sistemas',
        ModalidadSeleccion: [
            'Subasta Inversa',
            'Contratacion Directa',
            'Convocatoria Publica'
        ],
        Valor: 57091000.0,
        FuenteRecurso: 'Funcionamiento',
    }
];
