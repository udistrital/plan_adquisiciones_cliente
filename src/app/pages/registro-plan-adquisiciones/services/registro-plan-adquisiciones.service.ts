import { Injectable } from '@angular/core';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
  providedIn: 'root'
})
export class RegistroPlanAdquisicionesService {

  constructor(
    private rqManager: RequestManager,
  ) {
  }

  /**
   * getProducto(s)
   * If the response has errors in the OAS API it should show a popup message with an error.
   * If the response suceed, it returns the data of the object.
   * @param id object to get in the DB
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public getProductos(id?: any) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    if (!id) {
      id = ''
    }
    return this.rqManager.get('producto/' + id);
  }

  /**
   * getFuentes
   * If the response has errors in the OAS API it should show a popup message with an error.
   * If the response suceed, it returns the data of the object.
   * @param id object to get in the DB
   * @param param object with the params to get in the DB
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public getFuentes(id?: any, params?: any) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    const query_params = {
      query: '',
    }
    if (params) {
      query_params.query = id ? id + '/' + params.Vigencia + '/' + params.UnidadEjecutora : params.Vigencia + '/' + params.UnidadEjecutora;
    } else {
      query_params.query = '0/1';
    }
    return this.rqManager.get('fuente_financiamiento/' + query_params.query)
  }
}
