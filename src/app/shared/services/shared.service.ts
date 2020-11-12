import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../@core/managers/popUpManager';
import { RequestManager } from '../../@core/managers/requestManager';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private rqManager: RequestManager,
    private pUpManager: PopUpManager) { }

  /**
   * Gets arbol
   *  returns one tree level at once.
   * @param [branch] tree's branch to request info from the API
   * @returns  branch information.
   */
  public getArbol(branch?: string) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    // this.rqManager.setPath('DUMMY_SERVICE');
    // Set the optional branch for the API request.
    // const unidadEjecutora = 1;
    const params = {
      rama: branch,
    };
    // call request manager for the tree's data.
    return this.rqManager.get(`arbol_rubro/arbol/${branch}`, params);

  }

  public getRubro(codigo: string) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    return this.rqManager.get(`arbol_rubro/arbol/${codigo}`);
  }

  public getVigenciaActual(offset?: number) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    const params = {
      offset,
    };
    let query = '';
    if (offset) {
      query = `?offset=${offset}`;
    }
    return this.rqManager.get(`vigencia/vigencia_actual_area/1${query}`, params)
      // .pipe(
      //   map(
      //     (res) => {
      //       if (res['Type'] === 'error') {
      //         this.pUpManager
      //           .showErrorAlert('No se puede obtener la información de la vigencia actual');
      //         return undefined;
      //       }
      //       /* TODO: mejorare está función y el return*/
      //       return res[0].valor;
      //     }
      //   )
      // );
  }



}
