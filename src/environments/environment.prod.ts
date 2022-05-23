/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { SHARED } from './shared';

export const environment = {
  ...SHARED,

  CLIENTE_PRESUPUESTO: 'https://presupuesto.portaloas.udistrital.edu.co/',
  CLIENTE_CONTABILIDAD: 'https://contabilidad.portaloas.udistrital.edu.co/',
  production: true,
  IDPLANADQUISICIONES: '',
  IDPLANADQUISICIONESIDEXUD: '',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: 'TJ43YHyy3T29GrlTx9l0j7J7Cl8a',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role',
    REDIRECT_URL: 'https://planadquisiciones.portaloas.udistrital.edu.co/',
    SIGN_OUT_URL: 'https://planadquisiciones.portaloas.udistrital.edu.co/',
    SIGN_OUT_REDIRECT_URL: 'http://10.20.0.254/presupuesto_cliente/',
  },
};
