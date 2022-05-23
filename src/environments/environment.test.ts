/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { SHARED } from './shared';

export const environment = {
  ...SHARED,

  production: true,
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
    CLIENTE_ID: 'xytbuSBwcNJv9kLh57_zcfeN0REa',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role',
    REDIRECT_URL: 'https://pruebasplanadquisiciones.portaloas.udistrital.edu.co',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'https://pruebasplanadquisiciones.portaloas.udistrital.edu.co',
  },
};
