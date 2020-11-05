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
        name: 'Actividades Asociadas',
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
            // {
            //     name: 'metas',
            //     icon: 'fas fa-list',
            //     class: 'p-2',
            //     title: 'Ver Metas',
            // }
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
        numero: '1.1',
        nombre: 'Desarrollar diplomados y/o cursos certificados',
    },
    {
        numero: '2.1',
        nombre: 'Apoyar el desarrollo y organización de eventos que permitan la visibilización de la investigación de la UD',
    },
    {
        numero: '3.1',
        nombre: 'Apoyar el desarrollo de los proyectos de investigación de los grupos y semilleros de investigación institucionalizados y registrados en el sistema SICIUD',
    },
    {
        numero: '4.1',
        nombre: 'Apoyar los registros, patentes y demás procesos asociados a la protección de la propiedad intelectual',
    },
    {
        numero: '5.1',
        nombre: 'Lograr homologación y transferencia del 100% de la oferta académica de la universidad entre sus diferentes niveles de formación.',
    },
    {
        numero: '6.1',
        nombre: 'Gestionar la publicación de los resultados de investigación de acuerdo a lo establecido en la política editorial',
    },
    {
        numero: '7.1',
        nombre: 'Apoyar el proceso editorial de revistas institucionales',
    },
    {
        numero: '8.1',
        nombre: 'Generar el apoyo para el desarrollo de proyectos de investigación cofinanciados',
    },
    {
        numero: '9.1',
        nombre: 'Apoyar contrapartidas para Convocatorias de Jóvenes investigadores',
    },
    {
        numero: '10.1',
        nombre: 'Apoyar los a procesos estratégicos en sistemas de Información que apoyan el CIDC y las estructuras de Investigación',
    },
];
