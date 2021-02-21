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
      id = '';
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
  public getFuentesFinanciamiento(id?: any, params?: any) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    const query_params = {
      query: '',
    };
    if (params) {
      query_params.query = id ? id + '/' + params.Vigencia + '/' + params.UnidadEjecutora : params.Vigencia + '/' + params.UnidadEjecutora;
    } else {
      query_params.query = '0/1';
    }
    return this.rqManager.get('fuente_financiamiento/' + query_params.query);
  }

  /**
   * getElementosARKA
   * If the response has errors in the OAS API it should show a popup message with an error.
   * If the response suceed, it returns the data of the object.
   * @param searchString string para busqueda
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public getElementosARKA(searchString: any) {
    this.rqManager.setPath('CATALOGO_ELEMENTOS_ARKA_SERVICE');
    return this.rqManager.get('subgrupo?limit=-1&query=Codigo__contains:' + searchString + ',Activo:true&fields=Id,Nombre,Descripcion,Codigo');
  }
  /**
    * get Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por consultar
    * @returns  Plan creada.
    */
  public getRenglonPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_MID_SERVICE');
    return this.rqManager.get(
      `RegistrosPlanAdquisicion/` +
      `${Plan}`
    );
  }
  /**
    * Post Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por crear
    * @returns  Plan creada.
    */
  public CrearRenglonPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_MID_SERVICE');
    return this.rqManager.post(
      `RegistrosPlanAdquisicion`,
      Plan
    );
  }
  /**
    * Put Plan
    *  se modifica un Plan
    * @param [Plan] Plan por modificar
    * @returns  Plan Modificada.
    */
  public UpdateRenglonPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_MID_SERVICE');
    return this.rqManager.put(
      `RegistrosPlanAdquisicion/`,
      Plan,
      Plan.Id
    );
  }

  /**
    * get Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por consultar
    * @returns  Plan creada.
    */
  public getFichaTecnica(
    Plan: any,
    Rubro: any,
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Ficha_EB_IMGA/?query=` +
      `PlanAdquisicionesId:${Plan},` +
      `Rubro:${Rubro}`
    );
  }
  /**
    * Post Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por crear
    * @returns  Plan creada.
    */
  public CrearRenglonFichaTecnica(
    Ficha: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.post(
      `Ficha_EB_IMGA`,
      Ficha
    );
  }
  /**
    * Put Plan
    *  se modifica un Plan
    * @param [Plan] Plan por modificar
    * @returns  Plan Modificada.
    */
  public UpdateRenglonFichaTecnica(
    Ficha: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.put(
      `Ficha_EB_IMGA/`,
      Ficha,
      Ficha.Id
    );
  }

}
