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
    rowActions: {
        title: {
            name: 'string',
            class: 'string',
        },
        actions: [
            {
                name: 'string',
                icon: 'string',
                class: 'string',
                title: 'string',
            }
        ],
    },
    tableActions: [
        {
            name: 'string',
            icon: 'string',
            class: 'string',
            title: 'string',
        }
    ],
    noData: {
        name: 'string',
        class: 'string',
    },
    sort: 'boolean',
    filter: 'boolean',
};
export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'Lineamientos Asociadas',
        class: 'text-center text-light',
    },
    dataConfig: [
        {
            key: 'numero',
            title: {
                name: 'Numero',
                class: 'text-center',
            },
            pipe: {
                // functionPipe: (data: string) => {
                //     return data + ' ' + data;
                // },
                // class: 'text-uppercase'
                class: '',
            }
        },
        {
            key: 'nombre',
            title: {
                name: 'Nombre',
                class: 'text-center',
            },
            pipe: {
                // functionPipe: (data: string) => {
                //     return data + ' ' + data;
                // },
                // class: 'text-uppercase'
                class: 'text-justify',
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
                class: 'p-2',
                title: 'Editar',
            },
            {
                name: 'metas',
                icon: 'fas fa-list',
                class: 'p-2',
                title: 'Ver Metas',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Nueva Actividad',
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
        numero: '1',
        objetivo: 'Objetivo de Prueba 1',
        nombre: 'Formar ciudadanos, profesionales, investigadores, creadores e innovadores, íntegros con pensamiento crítico y cultura democrática, en contextos diferenciados inter y multiculturalespara la transformación de la sociedad',
    },
    {
        numero: '2',
        objetivo: 'Objetivo de Prueba 2',
        nombre: 'Establecer un diseño curricular dinámico y flexible que promueva el pluralismo y consolide una comunidad universitaria crítica transformadora y en armonía ambiental',
    },
    {
        numero: '3',
        objetivo: 'Objetivo de Prueba 3',
        nombre: 'Integrar las funciones universitarias por medio de la investigación, creación, innovación para la ampliación del conocimiento como bien público y para la solución de problemas de la ciudad',
    },
    {
        numero: '4',
        objetivo: 'Objetivo de Prueba 4',
        nombre: 'Garantizar, gestionar y proveer las condiciones institucionales para el cumplimiento de las funciones universitarias y el bienestar de su comunidad',
    },

];
