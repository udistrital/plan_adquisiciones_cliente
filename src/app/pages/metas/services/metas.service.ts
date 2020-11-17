import { Injectable } from '@angular/core';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  constructor(private rqManager: RequestManager,
    private pUpManager: PopUpManager) { }

  /**
   * Get Metas
   *  retorna las metas asociados al Meta y al Rubro seleccionado
   * @param [Lineamiento] Lineamiento Asociado
   * @param [Rubro] Rubro Asociado
   * @returns  Metas Asociadas.
   */
  public getMetasAsociadas(
    LineamientoId: any,
    Rubro: any,
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Meta/` +
      `?query=Activo:true,` +
      `LineamientoId:${LineamientoId},` +
      `Rubro:${Rubro}`
    );
  }
  /**
    * get Meta
    *  se crea una meta nueva
    * @param [Meta] Meta por consultar
    * @returns  Meta creado.
    */
   public getMeta(
    Meta: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Meta/`+
      `${Meta}`
    );
  }
  /**
    * Post Meta
    *  se crea una meta nueva
    * @param [Meta] Meta por crear
    * @returns  Meta creado.
    */
  public crearMeta(
    Meta: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.post(
      `Meta/`,
      Meta
    );
  }
  /**
    * Put Metas
    *  se modifica un Meta
    * @param [Meta] Meta por modificar
    * @returns  Meta creado.
    */
   public updateMeta(
    Meta: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.put(
      `Meta/`,
      Meta,
      Meta.Id
    );
  }

}
