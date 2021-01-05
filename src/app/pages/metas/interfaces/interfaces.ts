export const CONFIGURACION_PRUEBA: any = {
    title: {
        name: 'Metas Asociadas',
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
                name: 'actividades',
                icon: 'fas fa-list',
                class: 'p-2',
                title: 'Ver Actividades',
            }
        ],
    },
    tableActions: [
        {
            name: 'nuevo',
            icon: 'fas fa-plus py-1 px-2',
            class: 'px-2',
            title: 'Agregar Nueva Meta',
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
        numero: '1.',
        nombre: 'Mantener y elevar la acreditación institucional de alta calidad y alcanzar el reconocimiento internacional.',
    },
    {
        numero: '2.',
        nombre: 'Aumentar en 34% el número de estudiantes de pregrado matriculados.',
    },
    {
        numero: '3.',
        nombre: 'Aumentar el 65% de estudiantes matriculados en posgrado.',
    },
    {
        numero: '4.',
        nombre: 'Aumentar en 28% el número de programas en todos los niveles y modalidades',
    },
    {
        numero: '5.',
        nombre: 'Lograr homologación y transferencia del 100% de la oferta académica de la universidad entre sus diferentes niveles de formación.',
    },
];
