export const CONFIGURACION_TABLA_ELEMENTOS_ARKA: any = {
    title: {
        class: 'text-center text-light',
        label_i18n: 'codificacion_unspsc'
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Descripcion',
            title: {
                class: 'text-center',
                label_i18n: 'codigo'
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
                class: 'text-center',
                label_i18n: 'descripcion'
            },
            pipe: {
                class: 'text-center',
            }
        },

    ],
    rowActions: {
        title: {
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle',
            label_i18n: 'acciones'
        },
        actions: [
            {
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                label_i18n: 'editar_elemento'
            },
            {
                icon: 'fas fa-trash',
                class: 'p-2',
                label_i18n: 'eliminar_elemento'
            }
        ],
    },
    tableActions: [
        {
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2 mx-2',
            label_i18n: 'agregar_elemento'
        },
    ],
    noData: {
        class: 'text-center',
        label_i18n: 'sin_productos_asociados'
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
                class: 'text-center',
                label_i18n: 'actividades'
            },
            pipe: {
                class: '',
            },
            objectKeys: [
                {
                    key: 'Id2',
                    title: {
                        class: 'text-center',
                        label_i18n: 'numero'
                    },
                    pipe: {
                        class: '',
                    }
                },
                {
                    key: 'Nombre',
                    title: {
                        class: 'text-center',
                        label_i18n: 'nombre'
                    },
                    pipe: {
                        class: '',
                    }
                },
                {
                    key: 'Valor',
                    title: {
                        class: 'text-center',
                        label_i18n: 'valor'
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
                class: 'text-center',
                label_i18n: 'fuentes_financiamiento'
            },
            pipe: {
                class: '',
            },
            compound: [
                {
                    key: 'Codigo', // object key
                    title: {
                        name: 'Código',
                        class: 'text-center',
                        label_i18n: 'codigo'
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
                        label_i18n: 'nombre'
                    },
                    pipe: {
                        class: ''
                    },
                },
                {
                    key: 'Porcentaje', // object key
                    title: {
                        class: 'text-center',
                        label_i18n: 'porcentaje'
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
                        class: 'text-center',
                        label_i18n: 'valor'
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
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle',
            label_i18n: 'acciones'
        },
        actions: [
            {
                icon: 'fas fa-pencil-alt',
                class: '',
                label_i18n: 'editar_actividades_fuentes_asociadas'
            },
        ],
    },
    tableActions: [
        {
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            label_i18n: 'agregar_actividades_fuentes_asociadas'
        }
    ],
    noData: {
        class: 'text-center',
        label_i18n: 'sin_elementos_asociados'
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_FUENTES: any = {
    title: {
        class: 'text-center text-light',
        label_i18n: 'fuentes_financiamiento'
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Codigo',
            title: {
                class: 'text-center',
                label_i18n: 'codigo'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Nombre',
            title: {
                class: 'text-center',
                label_i18n: 'descripcion'
            },
            pipe: {
                class: 'text-center',
            }
        },
        {
            key: 'Porcentaje',
            title: {
                class: 'text-center',
                label_i18n: 'porcentaje'
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
                class: 'text-center',
                label_i18n: 'valor'
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
            actionClass: 'd-flex flex-row justify-content-around align-middle',
            label_i18n: 'acciones'
        },
        actions: [
            {
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                label_i18n: 'editar_fuente_financiamiento'
            },
            {
                icon: 'fas fa-trash',
                class: 'p-2',
                label_i18n: 'eliminar_fuente_financiamiento'
            }
        ],
    },
    tableActions: [
        {
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2 mx-2',
            label_i18n: 'agregar_fuente_financiamiento'
        },
    ],
    noData: {
        class: 'text-center',
        label_i18n: 'sin_fuentes_asociadas'
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_FICHA_ESTADISTICA: any = {
    title: {
        class: 'text-center text-light',
        label_i18n: 'fiha_estadisticas_basicas_inversion_metodologia_general_ajustada'
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Meta',
            title: {
                class: 'text-center',
                label_i18n: 'meta'
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
                class: 'text-center',
                label_i18n: 'proceso'
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Magnitud',
            title: {
                class: 'text-center',
                label_i18n: 'magnitud'
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'UnidadMedida',
            title: {
                class: 'text-center',
                label_i18n: 'unidad_medida'
            },
            pipe: {
                class: '',
            }
        },
        {
            key: 'Descripcion',
            title: {
                class: 'text-center',
                label_i18n: 'descripcion'
            },
            pipe: {
                class: '',
            }
        },
    ],
    rowActions: {
        title: {
            class: 'text-center',
            actionClass: 'd-flex flex-row justify-content-around align-middle',
            label_i18n: 'acciones'
        },
        actions: [
            {
                icon: 'fas fa-pencil-alt',
                class: '',
                label_i18n: 'editar_ficha'
            },
        ],
    },
    tableActions: [
        {
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            label_i18n: 'agregar_nueva_meta_asociada'
        }
    ],
    noData: {
        class: 'text-center',
        label_i18n: 'sin_elementos_asociados'
    },
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_PRODUCTOS_ASOCIADOS: any = {
    title: {
        class: 'text-center text-light',
        label_i18n: 'productos_asociados'
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Codigo',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'codigo'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Nombre',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'nombre'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'PorcentajeDistribucion2',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'procentaje_distribucion'
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
            actionClass: 'd-flex flex-row justify-content-around align-middle',
            label_i18n: 'acciones'
        },
        actions: [
            {
                icon: 'fas fa-pencil-alt',
                class: 'p-2',
                label_i18n: 'editar_producto_asociado'
            },
            {
                icon: 'fas fa-trash',
                class: 'p-2',
                label_i18n: 'eliminar_producto_asociado'
            },
        ],
    },
    noData: {
        class: 'text-center',
        label_i18n: 'sin_productos_asociados'
    },
    tableActions: [
        {
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            label_i18n: 'asociar_nuevo_producto'
        }
    ],
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_METAS_ASOCIADAS: any = {
    title: {
        class: 'text-center text-light',
        label_i18n: 'metas_asociadas'
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Numero',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'numero'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Nombre',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'descripcion'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
    ],
    rowActions: {
        title: {
            class: 'text-center align-middle',
            actionClass: 'd-flex flex-row justify-content-around align-middle',
            label_i18n: 'acciones'
        },
        actions: [
            {
                icon: 'fas fa-trash',
                class: 'p-2',
                label_i18n: 'eliminar_meta_asociada'
            },
        ],
    },
    noData: {
        class: 'text-center',
        label_i18n: 'sin_metas_asociadas'
    },
    tableActions: [
        {
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            label_i18n: 'asociar_nueva_meta'
        }
    ],
    sort: true,
    filter: false,
};

export const CONFIGURACION_TABLA_VER_ACTIVIDADES: any = {
    title: {
        class: 'text-center text-light',
        label_i18n: 'actividades_asociar'
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Numero2',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'numero'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
        {
            key: 'Nombre',
            title: {
                class: 'text-center align-middle',
                label_i18n: 'descripcion'
            },
            pipe: {
                class: 'text-center align-middle',
            }
        },
    ],
    noData: {
        class: 'text-center',
        label_i18n: 'sin_actividades_asociadas'
    },
    sort: true,
    filter: false,
};
