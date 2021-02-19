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
    subtitle: {
        name: '', // name subtitle
        class: 'text-center bg-primary text-light', // bootstrap class
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'CodigoArka',
            title: {
                name: 'Codigos UNSPSC',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
                isArray: true,
            }
        },
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
            key: 'Actividades',
            title: {
                name: 'Descripcion',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-justify align-middle',
                isArray: true,
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
                class: 'text-center align-middle',
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
            key: 'FuenteRecursos',
            title: {
                name: 'Fuente de Recurso',
                class: 'text-center align-middle',
            },
            pipe: {
                class: 'text-center align-middle',
                isArray: true,
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
                title: 'Editar Datos Rubro',
            },
        ],
    },
    noData: {
        name: 'No Existen Rubros Asociados',
        class: 'text-center',
    },
    endSubtotal: {
        first: {
            class: 'text-center bg-primary text-light',
        },
        last: {
            class: 'text-left bg-primary text-light',
        }
    },
    sort: true,
    filter: false,
};

export const PDF_PLANTILLA = {
    pageSize: 'LETTER',
    pageOrientation: 'landscape',
	content: [
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'PLAN DE ADQUISICIONES DE BIENES Y SERVICIOS DE LA UNIVERSIDAD DISTRITAL VIGENCIA 2020',
					            colSpan: 8,
					            alignment: 'center',
					            border: [false, false, false, false],
							    style: 'style_1'
					        }, 
					        {},{},{},{},{},{},{}
					    ],
					    [
					        {
					            text: '',
					            colSpan: 8,
					            alignment: 'center',
					            border: [false, false, false, false],
							    style: 'style_1'
					        },
					        {},{},{},{},{},{},{}
					    ],
					    [
					        {
					            text: 'Septima Edicion',
					            colSpan: 8,
					            alignment: 'right',
					            border: [false, false, false, false],
							    style: 'style_1'
					        },
					        {},{},{},{},{},{},{}
					    ],
				    ]
			}
	    },
	    {text:' '},
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'PLAN DE FUNCIONAMIENTO',
					            colSpan: 8,
					            alignment: 'center',
					            border: [true, true, true, false],
							    style: 'style_2'
					            
					        },
					        {},{},{},{},{},{},{}
					    ],
				    ]
			}
	    },
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'Rubro Compra de Equipo',
					            colSpan: 8,
					            alignment: 'center',
					            border: [true, true, true, false],
							    style: 'style_3'
					        },
					        {},{},{},{},{},{},{}
					    ],
					    [
					        {
					            text: 'Rubro Presupuestal',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Descripcion',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Fecha Estimada de Inicio de Proceso de seleccion',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					            
					        },
					        {
					            text: 'Duracion Estimada del Contrato',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Responsable Formulacion del Estudio de Conveniencia y Oportunidad',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Modalidad de Seleccion',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Valor Asignado',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Fuente de Recursos',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        }
					    ],
					    
					    [
					        {},{},{},{},{},{},
					        {
					            text: '$4.000.000',
					            alignment: 'right',
					        },
					        {
					            text: 'asdfasdf',
					        }
					    ], // Datos del Rubro
					    [
					        {
					            text: 'Total Rubro Compra de Equipo',
					            alignment: 'center',
					            colSpan: 6,
					            style: 'style_1'
					            
					        },{},{},{},{},{},
					        {
					            text:'$4.000.000',
					            alignment:'right',
					            style: 'style_1'
					        },
					        {
					            text:'',
					            style: 'style_1'
					            
					        }
					    ],
				    ]
			}
	    },
	    {text:' '},
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'TOTAL PLAN DE ADQUISICIONES DE FUNCIONAMIENTO',
					            colSpan: 6,
					            alignment: 'right',
					            style: 'style_2'
					            
					        }, {},{},{},{},{},
					        {
					            text:'$4.000.000',
					            alignment:'right',
					            style: 'style_2'
					            
					        },
					        {
					            text:'',
					            style: 'style_2'
					        }
					    ],
				    ]
			}
	    },
	    {text:' '},
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'PLAN DE INVERSION',
					            colSpan: 8,
					            alignment: 'center',
					            border: [true, true, true, false],
							    style: 'style_4'
					            
					        },
					        {},{},{},{},{},{},{}
					    ],
				    ]
			}
	    },
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'Promocion de la Investigacion y el Desarrollo Cientifico - 378',
					            colSpan: 8,
					            alignment: 'center',
					            border: [true, true, true, false],
							    style: 'style_6'
					        },
					        {},{},{},{},{},{},{}
					    ],
					    [
					        {
					            text: 'Rubro Presupuestal',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Descripcion',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Fecha Estimada de Inicio de Proceso de seleccion',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					            
					        },
					        {
					            text: 'Duracion Estimada del Contrato',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Responsable Formulacion del Estudio de Conveniencia y Oportunidad',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Modalidad de Seleccion',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Valor Asignado',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        },
					        {
					            text: 'Fuente de Recursos',
					            alignment: 'center',
					            border: [true, true, true, false],
					            style: 'style_2'
					        }
					    ],
					    [
					        {},{},{},{},{},{},
					        {
					            text: '$4.000.000',
					            alignment: 'right',
					        },
					        {
					            text: 'asdfasdf',
					        }
					    ], // Datos del Rubro
					    [
					        {
					            text: 'Total Rubro Promocion de la Investigacion y el Desarrollo Cientifico - 378',
					            alignment: 'center',
					            colSpan: 6,
					            style: 'style_5'
					            
					        },{},{},{},{},{},
					        {
					            text:'$4.000.000',
					            alignment:'right',
					            style: 'style_5'
					        },
					        {
					            text:'',
					            style: 'style_5'
					            
					        }
					    ],
				    ]
			}
	    },
	    {text:' '},
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'TOTAL PLAN DE ADQUISICIONES DE FUNCIONAMIENTO',
					            colSpan: 6,
					            alignment: 'right',
					            style: 'style_2'
					            
					        }, {},{},{},{},{},
					        {
					            text:'$4.000.000',
					            alignment:'right',
					            style: 'style_2'
					            
					        },
					        {
					            text:'',
					            style: 'style_2'
					        }
					    ],
				    ]
			}
	    },
	    {text:' '},
	    {
		    table: {
				    widths: ['*', '*','*', '*','*', '*','*', '*'],
				    body: [
					    [
					        {
					            text: 'TOTAL PLAN DE ADQUISICIONES',
					            colSpan: 6,
					            alignment: 'right',
					            style: 'style_4'
					            
					        }, {},{},{},{},{},
					        {
					            text:'$4.000.000',
					            alignment:'right',
					            style: 'style_4'
					            
					        },
					        {
					            text:'',
					            style: 'style_4'
					        }
					    ],
				    ]
			}
	    },
	    
	],
	styles: {
        body: {
          marginTop: 80,
        },
        general_font: {
          fontSize: 10,
          alignment: 'justify',
          margin: [25, 0, 25, 0],
        },
        general_list: {
          fontSize: 10,
          alignment: 'justify',
          margin: [35, 0, 25, 0],
        },
        topHeader: {
          margin: [5, 0, 5, 0],
          alignment: 'justify',
          fontSize: 8,
        },
        table: {
          margin: [30, 0, 30, 0],
          border: '0',
        },
        tableInfo: {
          fontSize: 9,
        },
        table2: {
          margin: [25, 0, 25, 0],
          border: '0',
          fontSize: 10,
        },
        style_1: {
            fillColor: '#1792CA',
		    color:'#ffffff',
			bold: true,
        },
        style_2: {
            fillColor: '#eeeeee',
			bold: true,
        },
        style_3: {
            fillColor: '#FECE30',
			bold: true,
        },
        style_4: {
            fillColor: '#F09102',
			bold: true,
        },
        style_5: {
            fillColor: '#C0F20C',
            bold: true,
        },
        style_6: {
            fillColor: '#E60077',
            bold: true,
        }
      },
	
}