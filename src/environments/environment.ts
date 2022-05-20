/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { SHARED } from './shared';

export const environment = {
  ...SHARED,

  production: false,
  // PLAN_ADQUISICIONES_CRUD_SERVICE: 'http://localhost:8081/v1/',
  // PLAN_ADQUISICIONES_MID_SERVICE: 'http://localhost:8083/v1/',
  // ADMINISTRATIVA_PRUEBAS_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8104/v1/',
  // PLAN_CUENTAS_MONGO_SERVICE: 'http://localhost:8082/v1/',
  // PLAN_CUENTAS_MID_SERVICE: 'http://localhost:8080/v1/',
  // PLAN_CUENTAS_MID_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8204/v1/',
  IDPLANADQUISICIONES: '625e10947e642dc1653e121b',
  IDPLANADQUISICIONESIDEXUD: '61ef760a6d6ad467ee92e2aa',
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
