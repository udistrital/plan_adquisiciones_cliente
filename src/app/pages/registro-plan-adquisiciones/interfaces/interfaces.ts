export const CONFIGURACION_TABLA_ELEMENTOS_ARKA: any = {
    title: {
        name: 'Codificacion UNSPSC',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Descripcion',
            title: {
                name: 'Codigo',
                class: 'text-center',
            },
            pipe: {
                type: 'custom',
                config: [
                    (data: any) => {
                        return data.split('-')[0];
                    }
                ],
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

export const CONFIGURACION_TABLA_ACTIVIDADES_FUENTES: any = {
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
                    key: 'Id2',
                    title: {
                        name: 'Número',
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
                        config: [
                            '$',
                            'symbol',
                            '3.2-2',
                            'en-US'
                        ],
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
                    key: 'Codigo', // object key
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
                        type: 'percent',
                        config: [
                            '1.2-2'
                        ],
                        class: ''
                    },
                },
                {
                    key: 'Valor', // object key
                    title: {
                        name: 'Valor',
                        class: 'text-center',
                    },
                    pipe: {
                        type: 'currency',
                        config: [
                            '$',
                            'symbol',
                            '3.2-2',
                            'en-US'
                        ],
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

export const CONFIGURACION_TABLA_FUENTES: any = {
    title: {
        name: 'Fuentes de Financiamiento',
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
        {
            key: 'Porcentaje',
            title: {
                name: '%',
                class: 'text-center',
            },
            pipe: {
                type: 'percent',
                config: [
                    '1.2-2'
                ],
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
                config: [
                    '$',
                    'symbol',
                    '3.2-2',
                    'en-US'
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

export const CONFIGURACION_TABLA_FICHA_ESTADISTICA: any = {
    title: {
        name: 'FICHA DE ESTADISTICAS BASICAS DE INVERSION Y DE METODOLOGIA GENERAL AJUSTADA',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Meta',
            title: {
                name: 'Meta',
                class: 'text-center',
            },
            pipe: {
                type: 'custom',
                config: [
                    (data: any) => {
                        return data.Numero;
                    }
                ],
                class: '',
            }
        },
        {
            key: 'Proceso',
            title: {
                name: 'Proceso',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Magnitud',
            title: {
                name: 'Magnitud',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'UnidadMedida',
            title: {
                name: 'Unidad de Medida',
                class: 'text-center',
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Descripcion',
            title: {
                name: 'Descripcion',
                class: 'text-center',
            },
            pipe: {
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
                class: '',
                title: 'Editar Ficha',
            },
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Nueva Meta Asociada',
        }
    ],
    noData: {
        name: 'No Existen Elementos Asociados',
        class: 'text-center',
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS: any = {
    title: {
        name: 'Productos Asociados',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Codigo',
            title: {
                name: 'Codigo',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Nombre',
            title: {
                name: 'Nombre',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'PorcentajeDistribucion2',
            title: {
                name: '% Distribucion',
                class: 'text-center align-middle',
            },
            pipe: {
                type: 'percent',
                config: [
                    '1.2-2'
                ],
                class: 'text-center align-middle'
            }
        },
    ],
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
                title: 'Editar Producto Asociado',
            },
            {
                name: 'Eliminar',
                icon: 'fas fa-trash',
                class: 'p-2',
                title: 'Eliminar Producto Asociado',
            },
        ],
    },
    noData: {
        name: 'No Existen Productos Asociados',
        class: 'text-center',
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Asociar Nuevo Producto',
        }
    ],
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_METAS_ASOCIADAS: any = {
    title: {
        name: 'Metas Asociadas',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Numero',
            title: {
                name: 'Número',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Nombre',
            title: {
                name: 'Descripcion',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
    ],
    rowActions: {
        title: {
            name: 'Acciones',
            class: 'text-center align-middle',
            actionClass: 'd-flex flex-row justify-content-around align-middle'
        },
        actions: [
            {
                name: 'Eliminar',
                icon: 'fas fa-trash',
                class: 'p-2',
                title: 'Eliminar Meta Asociada',
            },
        ],
    },
    noData: {
        name: 'No Existen Metas Asociadas',
        class: 'text-center',
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Asociar Nueva Meta',
        }
    ],
    sort: true,
    filter: false,
};
