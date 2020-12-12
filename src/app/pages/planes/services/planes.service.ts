import { Injectable } from '@angular/core';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(
    private rqManager: RequestManager,
  ) { }

  /**
   * Get Planes
   *  retorna las Planes
   * @returns  Planes Asociadas.
   */
  public getPlanes() {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Plan_adquisiciones/` +
      `?query=Activo:true` +
      `&limit=-1`
    );
  }

  /**
    * get Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por consultar
    * @returns  Plan creada.
    */
  public getPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Plan_adquisiciones/` +
      `${Plan}`
    );
  }

  /**
    * Post Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por crear
    * @returns  Plan creada.
    */
  public crearPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.post(
      `Plan_adquisiciones/`,
      Plan
    );
  }
  /**
    * Put Plan
    *  se modifica un Plan
    * @param [Plan] Plan por modificar
    * @returns  Plan Modificada.
    */
  public updatePlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.put(
      `Plan_adquisiciones/`,
      Plan,
      Plan.Id
    );
  }
}
