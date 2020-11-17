import { Injectable } from '@angular/core';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { RequestManager } from '../../../@core/managers/requestManager';

@Injectable({
  providedIn: 'root'
})
export class LineamientosService {

  constructor(private rqManager: RequestManager,
    private pUpManager: PopUpManager) { }

  /**
   * Get Lineamientos
   *  retorna los lineamientos asociados a la fuente de recurso, Centro Gestor y Area Funcional seleccionada
   * @param [CentroGestor] Caentro Gestor Asociado
   * @param [AreaFuncionalId] Area Funcional Asociado
   * @param [FuenteRecursoId] Fuente de Recurso Asociado
   * @returns  Lineamientos Asociados.
   */
  public getLineamientosAsociados(
    CentroGestor: any,
    AreaFuncionalId: any,
    FuenteRecursoId: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Lineamiento/` +
      `?query=Activo:true,` +
      `CentroGestor:${CentroGestor},` +
      `AreaFuncionalId:${AreaFuncionalId},` +
      `FuenteRecursoId:${FuenteRecursoId}`
    );
  }
  /**
    * Get Lineamiento
    *  se crea un lineamiento nuevo
    * @param [Lineamiento] lineamiento por consultar
    * @returns  Lineamiento creado.
    */
   public getLineamiento(
    Lineamiento: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Lineamiento/` +
      `${Lineamiento}`
    );
  }
  /**
    * Post Lineamientos
    *  se crea un lineamiento nuevo
    * @param [Lineamiento] lineamiento por crear
    * @returns  Lineamiento creado.
    */
  public crearLineamiento(
    Lineamiento: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.post(
      `Lineamiento/`,
      Lineamiento
    );
  }
  /**
    * Put Lineamientos
    *  se modifica un lineamiento
    * @param [Lineamiento] lineamiento por modificar
    * @returns  Lineamiento creado.
    */
   public updateLineamiento(
    Lineamiento: any
    ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.put(
      `Lineamiento/`,
      Lineamiento,
      Lineamiento.Id
    );
  }


}
