/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { SHARED } from './shared';

export const environment = {
    ...SHARED,

    production: false,
    NUXEO: {
        PATH: 'https://documental.udistrital.edu.co/nuxeo/',
    },
    CLIENTE_PRESUPUESTO: 'https://pruebaspresupuesto.portaloas.udistrital.edu.co/',
    CLIENTE_CONTABILIDAD: 'https://pruebascontabilidad.portaloas.udistrital.edu.co/',
    // PLAN_ADQUISICIONES_CRUD_SERVICE: 'http://localhost:8080/v1/',
    // PLAN_ADQUISICIONES_MID_SERVICE: 'http://localhost:8082/v1/',
    KNOWAGE: {
        PROTOCOL: 'https',
        HOST: 'tuleap.udistrital.edu.co',
        PORT: '',
        CONTEXTPATH: 'knowage',
        USER: 'bidev',
        PASSWORD: 'bidev',
    },
    TOKEN: {
        AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
        CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
        RESPONSE_TYPE: 'id_token token',
        SCOPE: 'openid email role',
        REDIRECT_URL: 'http://localhost:4200/',
        SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
        SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    },
};
