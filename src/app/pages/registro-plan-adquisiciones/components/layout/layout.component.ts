import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { LoadAreaFuncional, LoadCentroGestor } from '../../../../shared/actions/shared.actions';
import { getAreaFuncional, getCentroGestor } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { ActualizarRenglonPlan, CrearRenglonPlan } from '../../actions/registro-plan-adquisiciones.actions';
import { getRenglonSeleccionado, getRubro } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  titulo: any;
  TipoDePlan: any;
  Guardar: boolean;
  Registro: any;
  subscription$: any;
  subscription2$: any;
  subscription3$: any;


  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
    private location: Location,
    private pUpManager: PopUpManager,
    private translate: TranslateService,
  ) {
    this.titulo = 'Creacion Plan de Adquisiciones';
    this.TipoDePlan = true;
    this.Guardar = false;
    this.Registro = {};
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  ngOnInit() {
    this.subscription2$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        if ((renglon[0].RubroId as string).split('-')[1] === '01') {
          this.TipoDePlan = true;
        } else {
          this.TipoDePlan = false;
        }
        this.store.dispatch(LoadAreaFuncional({ Id: renglon[0].AreaFuncional }));
        this.store.dispatch(LoadCentroGestor({ CentroGestor: renglon[0].CentroGestor }));
      }
    });
    this.subscription3$ = this.store.select(getRubro).subscribe((data: any) => {
      if (this.sharedService.IfStore(data)) {
        if (data.data.Codigo.split('-')[1] === '01') {
          this.TipoDePlan = true;
        } else {
          this.TipoDePlan = false;
        }
      }
    });
    this.subscription$ = combineLatest([
      this.store.select('registroPlanAdquisiciones'),
      this.store.select(getCentroGestor),
      this.store.select(getAreaFuncional),
      this.store.select(getPlanSeleccionado),
      // this.store.select(getPlanDetallado),
      this.store.select(getRenglonSeleccionado),
    ]).subscribe(([data, centro, area, plan, renglon]) => {
      if (this.sharedService.IfStore(renglon)) {
        if (this.RegistroCompleto(data, centro, area, plan)) {
          this.Registro = this.ActualizarRegistro(data, centro, area, plan, renglon[0]);
          this.Guardar = true;
        } else {
          this.Guardar = false;
        }
      } else {
        if (this.RegistroCompleto(data, centro, area, plan)) {
          this.Registro = this.CrearRegistroNuevo(data, centro, area, plan);
          this.Guardar = true;
        } else {
          this.Guardar = false;
        }
      }

    });
    this.sharedService.RetornarAlInicio('planes', 'pages/plan-adquisiciones/planes/tabla-general');
  }

  RegistroCompleto(data: any, centro: any, area: any, plan: any) {
    if (this.TipoDePlan) {
      return this.RevisarRegistroFuncionamiento(data, centro, area, plan);
    } else {
      return this.RevisarRegistroInversion(data, centro, area, plan);
    }
  }

  OnSubmit() {
    if (this.Registro.Id) {
      this.store.dispatch(ActualizarRenglonPlan(this.Registro));
    } else {
      this.store.dispatch(CrearRenglonPlan(this.Registro));
    }

  }

  RevisarRegistroInversion(data: any, centro: any, area: any, plan: any) {
    if (
      this.sharedService.IfStore(data.Rubro) &&
      this.sharedService.IfStore(data.MetasAsociadas) &&
      this.sharedService.IfStore(data.ProductosAsociados) &&
      this.sharedService.IfStore(data.Responsable) &&
      this.sharedService.IfStore(data.FechaSeleccion) &&
      this.sharedService.IfStore(data.Modalidades) &&
      this.sharedService.IfStore(data.ElementosARKA) &&
      this.sharedService.IfStore(data.Actividades) &&
      this.sharedService.IfStore(centro) &&
      this.sharedService.IfStore(area) &&
      this.sharedService.IfStore(plan)
    ) {
      return true;
    } else {
      return false;
    }
  }

  RevisarRegistroFuncionamiento(data: any, centro: any, area: any, plan: any) {
    if (
      this.sharedService.IfStore(data.Rubro) &&
      this.sharedService.IfStore(data.Responsable) &&
      this.sharedService.IfStore(data.FechaSeleccion) &&
      this.sharedService.IfStore(data.Modalidades) &&
      this.sharedService.IfStore(data.ElementosARKA) &&
      this.sharedService.IfStore(data.ActividadFuente) &&
      this.sharedService.IfStore(data.Producto) &&
      this.sharedService.IfStore(centro) &&
      this.sharedService.IfStore(area) &&
      this.sharedService.IfStore(plan)
    ) {
      if (data.ActividadFuente.Valor <= data.Rubro.data.ValorActual) {
        return true;
      } else {
        this.pUpManager.showErrorToast(this.translate.instant(`ERROR: El valor asignado a la fuente supera el valor actual del rubro: \$${data.Rubro.data.ValorActual}`));
        return false;
      }
    } else {
      return false;
    }
  }

  CrearRegistroNuevo(data: any, centro: any, area: any, plan: any) {

    const NuevoRegistro: any = {};

    NuevoRegistro.AreaFuncional = area.Id;
    NuevoRegistro.CentroGestor = centro.CentroGestor;
    NuevoRegistro.ResponsableId = data.Responsable.Id;
    NuevoRegistro.Activo = true;
    NuevoRegistro.RubroId = data.Rubro.data.Codigo;
    NuevoRegistro.FuenteFinanciamientoId = '';
    NuevoRegistro.FechaEstimadaInicio = this.sharedService.ConvertirFecha(data.FechaSeleccion.start);
    NuevoRegistro.FechaEstimadaFin = this.sharedService.ConvertirFecha(data.FechaSeleccion.end);
    NuevoRegistro.PlanAdquisicionesId = plan.Id;
    NuevoRegistro.ModalidadSeleccion = this.CrearModalidades(data);
    NuevoRegistro.CodigoArka = this.CrearElementosARKA(data);

    if (this.TipoDePlan) {
      NuevoRegistro.ActividadId = data.ActividadFuente.Actividad.Id;
      NuevoRegistro.FuenteFinanciamientoId = data.Producto.Codigo;
      NuevoRegistro.ValorActividad = data.ActividadFuente.Valor;
    } else {
      NuevoRegistro.RegistroPlanAdquisicionActividad = this.CrearActividades(data);
      NuevoRegistro.MetasAsociadas = this.CrearMetasAsociadas(data);
      NuevoRegistro.ProductosAsociados = this.CrearProductosAsociados(data);
    }

    return NuevoRegistro;
  }
  CrearModalidades(data: any) {
    return (data.Modalidades[0] as Array<any>).map((element: any) => {
      return {
        Id: 0,
        IdModalidadSeleccion: element.Id.toString(),
        Activo: true,
      };
    });
  }
  CrearElementosARKA(data: any) {
    return (data.ElementosARKA[0] as Array<any>).map((element: any) => {
      return {
        Id: 0,
        CodigoArka: element.Id.toString(),
        Activo: true,
      };
    });
  }
  CrearActividades(data: any) {
    return (data.Actividades[0] as Array<any>).map((element: any) => {
      return {
        Id: 0,
        RegistroActividadId: 0,
        ActividadId: element.ActividadId.Id,
        Valor: element.Valor,
        Activo: true,
        FuentesFinanciamiento: this.CrearFuentes(element),
      };
    });
  }
  CrearFuentes(element: any) {
    return (element.FuentesFinanciamiento as Array<any>).map((fuente: any) => {
      return {
        Id: 0,
        FuenteFinanciamientoId: fuente.Codigo,
        Activo: true,
        ValorAsignado: fuente.Valor,
      };
    });
  }
  CrearMetasAsociadas(element: any) {
    return (element.MetasAsociadas[0] as Array<any>).map((meta: any) => {
      return {
        Id: 0,
        Activo: true,
        MetaId: meta.Id
      };
    });
  }
  CrearProductosAsociados(element: any) {
    return (element.ProductosAsociados[0] as Array<any>).map((producto: any) => {
      return {
        Id: 0,
        Activo: true,
        ProductoAsociadoId: producto._id,
        PorcentajeDistribucion: producto.PorcentajeDistribucion,
      };
    });
  }

  ActualizarRegistro(data: any, centro: any, area: any, plan: any, renglon: any) {

    const ActualizarRegistro: any = {};

    ActualizarRegistro.Id = renglon.Id;
    ActualizarRegistro.AreaFuncional = area.Id;
    ActualizarRegistro.CentroGestor = centro.CentroGestor;
    ActualizarRegistro.ResponsableId = data.Responsable.Id;
    ActualizarRegistro.Activo = true;
    ActualizarRegistro.RubroId = data.Rubro.data.Codigo;
    ActualizarRegistro.FuenteFinanciamientoId = '';
    ActualizarRegistro.FechaEstimadaInicio = this.sharedService.ConvertirFecha(data.FechaSeleccion.start);
    ActualizarRegistro.FechaEstimadaFin = this.sharedService.ConvertirFecha(data.FechaSeleccion.end);
    ActualizarRegistro.PlanAdquisicionesId = plan.Id;
    ActualizarRegistro.ModalidadSeleccion = this.ActualizarModalidades(data, renglon);
    ActualizarRegistro.CodigoArka = this.ActualizarElementosARKA(data, renglon);

    if (this.TipoDePlan) {
      ActualizarRegistro.ActividadId = data.ActividadFuente.Actividad.Id;
      ActualizarRegistro.FuenteFinanciamientoId = data.Producto.Codigo;
      ActualizarRegistro.ValorActividad = data.ActividadFuente.Valor;
    } else {
      ActualizarRegistro.RegistroPlanAdquisicionActividad = this.ActualizarActividades(data, renglon);
      ActualizarRegistro.MetasAsociadas = this.ActualizarMetasAsociadas(data, renglon);
      ActualizarRegistro.ProductosAsociados = this.ActualizarProductosAsociados(data, renglon);

    }

    return ActualizarRegistro;
  }

  ActualizarModalidades(data: any, renglon: any) {
    const modalidades: any = this.CrearModalidades(data);
    (renglon['registro_funcionamiento-modalidad_seleccion'] as Array<any>).forEach(element => {
      const index = modalidades.findIndex((x: any) => x.IdModalidadSeleccion === element.IdModalidadSeleccion);
      if (index !== -1) {
        modalidades[index].Id = element.Id;
      } else {
        modalidades.push({
          Id: element.Id,
          IdModalidadSeleccion: element.IdModalidadSeleccion,
          Activo: false,
        });
      }
    });
    return modalidades;
  }
  ActualizarElementosARKA(data: any, renglon: any) {
    const ElementosARKA: any = this.CrearElementosARKA(data);
    (renglon['registro_plan_adquisiciones-codigo_arka'] as Array<any>).forEach(element => {
      const index = ElementosARKA.findIndex((x: any) => x.CodigoArka === element.CodigoArka);
      if (index !== -1) {
        ElementosARKA[index].Id = element.Id;
      } else {
        ElementosARKA.push({
          Id: element.Id,
          CodigoArka: element.CodigoArka,
          Activo: false,
        });
      }
    });
    return ElementosARKA;
  }
  ActualizarActividades(data: any, renglon: any) {
    const actividades: any = this.CrearActividades(data);
    (renglon['registro_plan_adquisiciones-actividad'] as Array<any>).forEach(element => {
      const index = actividades.findIndex((x: any) => x.ActividadId === element.ActividadId);
      if (index !== -1) {
        actividades[index].Id = element.RegistroActividadId;
        actividades[index].RegistroActividadId = element.RegistroActividadId;
        actividades[index].FuentesFinanciamiento = this.ActualizarFuentes(
          actividades[index].FuentesFinanciamiento,
          element.FuentesFinanciamiento
        );
      } else {
        actividades.push({
          ActividadId: element.Id,
          Valor: element.Valor,
          Id: element.RegistroActividadId,
          RegistroActividadId: element.RegistroActividadId,
          FuentesFinanciamiento: this.ActualizarFuentes(
            actividades[index].FuentesFinanciamiento,
            element.FuentesFinanciamiento
          ),
          Activo: false,
        });
      }
    });
    return actividades;
  }

  ActualizarFuentes(data: any, renglon: any) {
    const fuentes: any = data;
    (renglon as Array<any>).forEach(element => {
      const index = fuentes.findIndex((x: any) => x.FuenteFinanciamientoId === element.FuenteFinanciamiento);
      if (index !== -1) {
        fuentes[index].Id = element.Id;
      } else {
        fuentes.push({
          Id: element.Id,
          Codigo: element.Codigo,
          FuenteFinanciamientoId: element.FuenteFinanciamiento,
          ValorAsignado: element.ValorAsignado,
          Activo: false,
        });
      }
    });
    return fuentes;
  }

  ActualizarMetasAsociadas(data: any, renglon: any) {
    const MetasAsociadas: any = this.CrearMetasAsociadas(data);
    (renglon['registro_funcionamiento-metas_asociadas'] as Array<any>).forEach(element => {
      const index = MetasAsociadas.findIndex((x: any) => x.MetaId === element.MetaId.Id);
      if (index !== -1) {
        MetasAsociadas[index].Id = element.Id;
      } else {
        MetasAsociadas.push({
          Id: element.Id,
          MetaId: element.MetaId.Id,
          Activo: false,
        });
      }
    });
    return MetasAsociadas;
  }
  ActualizarProductosAsociados(data: any, renglon: any) {
    const ProductosAsociados: any = this.CrearProductosAsociados(data);
    (renglon['registro_funcionamiento-productos_asociados'] as Array<any>).forEach(element => {
      const index = ProductosAsociados.findIndex((x: any) => x.ProductoAsociadoId === element.ProductoAsociadoId);
      if (index !== -1) {
        ProductosAsociados[index].Id = element.Id;
      } else {
        ProductosAsociados.push({
          Id: element.Id,
          ProductoAsociadoId: element.ProductoAsociadoId,
          PorcentajeDistribucion: element.PorcentajeDistribucion,
          Activo: false,
        });
      }
    });
    return ProductosAsociados;
  }
}

