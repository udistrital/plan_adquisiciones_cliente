import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
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
    private route: Router,
    private state: State<any>
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
    return this.rqManager.get(`arbol_rubro/arbol_reducido/${branch}?nivel=-1`, params);

  }

  public getRubro(codigo: string, area: any, vigencia: any, nivel: any) {
    this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
    return this.rqManager.get(`arbol_rubro_apropiacion/arbol_apropiacion_valores/${area}/${vigencia}/${codigo}?nivel=${nivel}`);
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

  /**
   * get Modalidades de seleccion
   * If the response has errors in the OAS API it should show a popup message with an error.
   * If the response suceed, it returns the data of the object.
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public getResponsables() {
    this.rqManager.setPath('OIKOS_2_SERVICE');
    const query_params = {
      query: '?query=Activo:true&limit=-1&sortby=Nombre&order=asc',
    };
    return this.rqManager.get('dependencia/' + query_params.query);
  }

  public RetornarAlInicio(store: any, route: any) {
    if (Object.keys(this.state.getValue()).find(key => key ===  store) === undefined) {
      this.route.navigate([route]);
    }
  }

  public getDaysMonth(date: Date) {

    const m = date.getMonth();
    const y = date.getFullYear();

    switch (true) {
      case m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 11:
        return 31;
      case m === 3 || m === 5 || m === 8 || m === 10:
        return 30;
      case m === 1:
        if (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0)) {
          return 29;
        } else {
          return 28;
        }
    }
  }

  public DuracionLimite(value: any) {
    if (value && value.start && value.end) {

      let years = value.end.getFullYear() - value.start.getFullYear();
      let months = value.end.getMonth() - value.start.getMonth();
      let days = value.end.getDate() - value.start.getDate();

      // Esta parte del codigo ajusta el rango de tiempo cuando los dias empiezan a las 00:00
      if (days < 0) {
        months -= 1;
        days += this.getDaysMonth(value.start);
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // Esta parte del codigo agrega un dia adicional al rango de tiempo para que sea desde las 00:00 del primer dia a las 11:59 del dia final
      days += 1;
      if ((days) === this.getDaysMonth(value.end)) {
        days = 0;
        months += 1;
      }

      // esta parte es para retornar true si es menor o igual a un año y false si es mayor a un año
      if (years === 0) {
        return true;
      } else {
        if (years === 1 && months === 0 && days === 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
