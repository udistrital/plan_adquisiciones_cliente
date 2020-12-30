import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadAreaFuncional, LoadCentroGestor } from '../../../../shared/actions/shared.actions';
import { getAreaFuncional, getCentroGestor } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { ActualizarRenglonPlan, CrearRenglonPlan } from '../../actions/registro-plan-adquisiciones.actions';
import { getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

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
  ) {
    this.titulo = 'Creacion Plan de Adquisiciones';
    this.TipoDePlan = true;
    this.Guardar = false;
    this.Registro = {};
  }

  ngOnInit() {
    this.subscription2$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        const fuente: any = (renglon[0].RubroId as string).split('-')
        if ((fuente[0] + '-' + fuente[1]) === '3-01') {
          this.TipoDePlan = false;
        } else {
          this.TipoDePlan = true;
        }
        this.store.dispatch(LoadAreaFuncional({ Id: renglon[0].AreaFuncional }));
        this.store.dispatch(LoadCentroGestor({ CentroGestor: renglon[0].CentroGestor }));
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
  }

  OnSubmit() {

    if (this.Registro.Id) {
      this.store.dispatch(ActualizarRenglonPlan(this.Registro));
    } else {
      this.store.dispatch(CrearRenglonPlan(this.Registro));
    }

  }

  RegistroCompleto(data: any, centro: any, area: any, plan: any) {
    if (this.TipoDePlan) {
      if (
        this.sharedService.IfStore(data.Rubro) &&
        this.sharedService.IfStore(data.Meta) &&
        this.sharedService.IfStore(data.Producto) &&
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
    } else {
      if (
        this.sharedService.IfStore(data.Rubro) &&
        // this.sharedService.IfStore(data.Meta) &&
        // this.sharedService.IfStore(data.Producto) &&
        this.sharedService.IfStore(data.Responsable) &&
        this.sharedService.IfStore(data.FechaSeleccion) &&
        this.sharedService.IfStore(data.Modalidades) &&
        this.sharedService.IfStore(data.ElementosARKA) &&
        // this.sharedService.IfStore(data.Actividades) &&
        this.sharedService.IfStore(centro) &&
        this.sharedService.IfStore(area) &&
        this.sharedService.IfStore(plan)
      ) {
        return true;
      } else {
        return false;
      }
    }
    
  }
  CrearRegistroNuevo(data: any, centro: any, area: any, plan: any) {

    const NuevoRegistro: any = {};

    NuevoRegistro.AreaFuncional = area.Id;
    NuevoRegistro.CentroGestor = centro.CentroGestor;
    NuevoRegistro.ResponsableId = data.Responsable.Id;
    NuevoRegistro.Activo = true;
    NuevoRegistro.MetaId = data.Meta.Id.toString();
    NuevoRegistro.ProductoId = data.Producto._id;
    NuevoRegistro.RubroId = data.Rubro.data.Codigo;
    NuevoRegistro.FechaEstimadaInicio = this.sharedService.ConvertirFecha(data.FechaSeleccion.start);
    NuevoRegistro.FechaEstimadaFin = this.sharedService.ConvertirFecha(data.FechaSeleccion.end);
    NuevoRegistro.PlanAdquisicionesId = plan.Id;
    NuevoRegistro.ModalidadSeleccion = this.CrearModalidades(data);
    NuevoRegistro.CodigoArka = this.CrearElementosARKA(data);
    NuevoRegistro.RegistroPlanAdquisicionActividad = this.CrearActividades(data);

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

  ActualizarRegistro(data: any, centro: any, area: any, plan: any, renglon: any) {

    const ActualizarRegistro: any = {};

    ActualizarRegistro.Id = renglon.Id;
    ActualizarRegistro.AreaFuncional = area.Id;
    ActualizarRegistro.CentroGestor = centro.CentroGestor;
    ActualizarRegistro.ResponsableId = data.Responsable.Id;
    ActualizarRegistro.Activo = true;
    ActualizarRegistro.MetaId = data.Meta.Id.toString();
    ActualizarRegistro.ProductoId = data.Producto._id;
    ActualizarRegistro.RubroId = data.Rubro.data.Codigo;
    ActualizarRegistro.FechaEstimadaInicio = this.sharedService.ConvertirFecha(data.FechaSeleccion.start);
    ActualizarRegistro.FechaEstimadaFin = this.sharedService.ConvertirFecha(data.FechaSeleccion.end);
    ActualizarRegistro.PlanAdquisicionesId = plan.Id;
    ActualizarRegistro.ModalidadSeleccion = this.ActualizarModalidades(data, renglon);
    ActualizarRegistro.CodigoArka = this.ActualizarElementosARKA(data, renglon);
    ActualizarRegistro.RegistroPlanAdquisicionActividad = this.ActualizarActividades(data, renglon);

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
}
