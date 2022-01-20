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
      `&limit=-1` +
      `&sortby=FechaModificacion` +
      `&order=desc`
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

  /**
    * get Plan
    *  se crea una Plan nueva
    * @param [Plan] Plan por consultar
    * @returns  Plan creada.
    */
  public getPlanDetallado(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_MID_SERVICE');
    return this.rqManager.get(
      `RegistrosOrdenadoPorRubro/` +
      `${Plan}`
    );
  }

  /**
    * get Plan
    *  se solicitan las versiones del plan
    * @param [Plan] Plan por consultar
    * @returns  Plan creada.
    */
  public getVersionesPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_MID_SERVICE');
    return this.rqManager.get(
      `PlanAdquisicion/versiones/` +
      `${Plan}`
    );
  }

  /**
    * Put Plan
    *  se publica un plan
    * @param [Plan] Plan por modificar
    * @returns  Plan Modificada.
    */
  public publicarPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_MID_SERVICE');
    return this.rqManager.put(
      `PlanAdquisicion/`,
      Plan,
      Plan.Id
    );
  }

  /**
    * get Plan
    *  se solicitan las versiones del plan
    * @param [Plan] Plan por consultar
    * @returns  Plan creada.
    */
  public getVersionPlan(
    Plan: any
  ) {
    this.rqManager.setPath('PLAN_ADQUISICIONES_CRUD_SERVICE');
    return this.rqManager.get(
      `Plan_adquisiciones_mongo/` +
      `${Plan}`
    );
  }

  public SacarSumaFuente(plan: any) {
    return plan.map((key: any) => {
      return this.SacarSumaRubro(key.datos);
    }).reduce((accumulator: any, currentValue: any) => accumulator + currentValue);
  }
  public SacarTotalPlan(plan: any) {
    return plan.map((key: any) => {
      return this.SacarSumaFuente(key.datos);
    }).reduce((accumulator: any, currentValue: any) => accumulator + currentValue);
  }
  public SacarSumaRubro(plan: any) {
    return plan.map((element: any) => {
      if (element.FuenteFinanciamientoId === '') {
        return element.ValorTotalActividades;
      } else {
        return element.ValorActividad;
      }
    }).reduce((accumulator: any, currentValue: any) => accumulator + currentValue);
  }
  public AjustarDatosPlan(datos: any[]) {

    return datos.map((element: any) => {
      element.FechaEstimada = {
        start: new Date(element.FechaEstimadaInicio),
        end: new Date(element.FechaEstimadaFin),
      };
      element.ModalidadSeleccion = (element['registro_funcionamiento-modalidad_seleccion'] as Array<any>).map((data: any) => {
        return data.Nombre;
      });
      element.CodigoArka = (element['registro_plan_adquisiciones-codigo_arka'] as Array<any>).map((data: any) => {
        return data.Descripcion.split('-')[0];
      });
      if (element.FuenteFinanciamientoId === '') {
        const info = this.ObtenerFuentes(element['registro_plan_adquisiciones-actividad']);
        element.FuenteRecursos = info[0];
        element.Actividades = info[1];
      } else {
        element.FuenteRecursos = [element.FuenteFinanciamientoData.Nombre];
        element.ValorTotalActividades = element.ValorActividad;
        element.Actividades = [element.ActividadData.Nombre];
      }
      return element;
    });
  }
  public ObtenerFuentes(Actividad: any) {
    const fuentes: any[] = [];
    const actividades: any[] = [];
    Actividad.forEach((element: any) => {
      actividades.push(element.Numero + '.' + element.NumeroMeta + ' ' + element.Nombre);
      element.FuentesFinanciamiento.forEach((data: any) => {
        if (fuentes.find((x: any) => x === data.Nombre) === undefined) {
          fuentes.push(data.Nombre);
        }
      });
    });
    return [fuentes, actividades];
  }
}
