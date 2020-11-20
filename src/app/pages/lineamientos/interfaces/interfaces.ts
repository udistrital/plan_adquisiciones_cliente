export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'Lineamientos Asociadas',
        class: 'text-center text-light',
    },
    showColumnTitle: true,
    dataConfig: [
        {
            key: 'Numero',
            title: {
                name: 'Numero',
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
        Numero: '1',
        Objetivo: 'Objetivo de Prueba 1',
        Nombre: 'Formar ciudadanos, profesionales, investigadores, creadores e innovadores, íntegros con pensamiento crítico y cultura democrática, en contextos diferenciados inter y multiculturalespara la transformación de la sociedad',
    },
    {
        Numero: '2',
        Objetivo: 'Objetivo de Prueba 2',
        Nombre: 'Establecer un diseño curricular dinámico y flexible que promueva el pluralismo y consolide una comunidad universitaria crítica transformadora y en armonía ambiental',
    },
    {
        Numero: '3',
        Objetivo: 'Objetivo de Prueba 3',
        Nombre: 'Integrar las funciones universitarias por medio de la investigación, creación, innovación para la ampliación del conocimiento como bien público y para la solución de problemas de la ciudad',
    },
    {
        Numero: '4',
        Objetivo: 'Objetivo de Prueba 4',
        Nombre: 'Garantizar, gestionar y proveer las condiciones institucionales para el cumplimiento de las funciones universitarias y el bienestar de su comunidad',
    },

];
