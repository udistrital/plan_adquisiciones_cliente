import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../@core/managers/popUpManager';
import { RequestManager } from '../../@core/managers/requestManager';
import { getArbolRubro } from '../selectors/shared.selectors';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  behavior: BehaviorSubject<any>;

  constructor(
    private rqManager: RequestManager,
    private store: Store<any>,
  ) {

    this.behavior = new BehaviorSubject({
      width: window.innerWidth,
      height: window.innerHeight,
      size: this.catchSize(window.innerWidth),
    });

    fromEvent(window, 'resize').pipe(
      map((event: any) => {
        return {
          width: event.target.innerWidth,
          height: event.target.innerHeight,
          size: this.catchSize(event.target.innerWidth),
        };
      }),
    ).subscribe((data) => {
      this.behavior.next(data);
    });
  }

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
  /**
     * Gets Vigencia Actual
     *  returns one tree level at once.
     * @param [offset]
     * @returns  vigencia information.
     */
  public getVigenciaActual(offset?: number) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    const params = {
      offset,
    };
    let query = '';
    if (offset) {
      query = `?offset=${offset}`;
    }
    return this.rqManager.get(`vigencia/vigencia_actual_area/1${query}`, params);
  }



  /**
     * getScreenSize
     * capturar el tamaño de pantalla y el tamaño de bootstrap
     * @returns  <Observable> data of the screen size
     */

  public getScreenSize() {
    return this.behavior.asObservable();
  }

  private catchSize(width: any) {
    switch (true) {
      case (width < 576):
        return 'xs';
      case (width >= 576 && width < 768):
        return 'sm';
      case (width >= 768 && width < 992):
        return 'md';
      case (width >= 992 && width < 1200):
        return 'lg';
      case (width >= 1200):
        return 'xl';
    }
  }

  /**
   * get Modalidades de seleccion
   * If the response has errors in the OAS API it should show a popup message with an error.
   * If the response suceed, it returns the data of the object.
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public getModalidadesDeSeleccion() {
    this.rqManager.setPath('ADMINISTRATIVA_SERVICE');
    const query_params = {
      query: '?limit=-1&sortby=NumeroOrden&order=asc',
    };
    return this.rqManager.get('modalidad_seleccion/' + query_params.query);
  }
  /**
     * If para Datos del Store
     * Si el elemento es null o es { type: '[Store] Action' } regresa false
     * Si el elemento es diferente de lo anterior regresa true
     * @returns  Boolean Informacion si existe el elemento o no
     */
  public IfStore(data: any) {
    if (data) {
      if (Object.keys(data)[0] !== 'type') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  BuscarNodo(arbol: any, codigo: string) {

    for (const element of arbol) {

      if (codigo.indexOf(element.Codigo) !== -1) {
        if (element.Codigo === codigo) {
          return element;
        } else {
          if (element.children) {
            return this.BuscarNodo(element.children, codigo);
          }
        }
      }
    }
  }

  ConvertirFecha(fecha: any) {
    if (fecha) {
      const datos: any = fecha.toISOString().split('T');
      datos[1] = datos[1].split('Z')[0];
      return `${datos[0]} ${datos[1]} +0000 +0000`;
    } else {
      return null;
    }

  }
}
