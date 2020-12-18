import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getAreaFuncional, getCentroGestor } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { CrearRenglonPlan } from '../../actions/registro-plan-adquisiciones.actions';

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
    this.subscription$ = combineLatest([
      this.store.select('registroPlanAdquisiciones'),
      this.store.select(getCentroGestor),
      this.store.select(getAreaFuncional),
      this.store.select(getPlanSeleccionado),
      // this.store.select(getPlanDetallado),
      // this.store.select(getRenglonSeleccionado),
    ]).subscribe(([data, centro, area, plan]) => {
      if (this.RegistroCompleto(data, centro, area, plan)) {
        this.Registro = this.CrearRegistroNuevo(data, centro, area, plan);
        this.Guardar = true;
      } else {
        this.Guardar = false;
      }
    });
  }

  OnSubmit() {
    // console.log(this.Registro);
    this.store.dispatch(CrearRenglonPlan(this.Registro));
  }

  RegistroCompleto(data: any, centro: any, area: any, plan: any) {
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
  }
  CrearRegistroNuevo(data: any, centro: any, area: any, plan: any) {

    const NuevoRegistro: any = {};

    NuevoRegistro.AreaFuncional = area.Id;
    NuevoRegistro.CentroGestor = centro.CentroGestor;
    // NuevoRegistro.CentroGestor = 1;
    NuevoRegistro.ResponsableId = data.Responsable.Id;
    NuevoRegistro.Activo = true;
    NuevoRegistro.MetaId = data.Meta.Id.toString();
    NuevoRegistro.ProductoId = data.Producto.Codigo.toString();
    NuevoRegistro.RubroId = data.Rubro.data.Codigo;
    NuevoRegistro.FechaEstimadaInicio = data.FechaSeleccion.start;
    NuevoRegistro.FechaEstimadaFin = data.FechaSeleccion.end;
    NuevoRegistro.PlanAdquisicionesId = plan.Id;
    NuevoRegistro.ModalidadSeleccion = this.CrearModalidades(data);
    NuevoRegistro.CodigoArka = this.CrearElementosARKA(data);
    NuevoRegistro.RegistroPlanAdquisicionActividad = this.CrearActividades(data);

    return NuevoRegistro;
  }

  CrearModalidades(data: any) {
    const modalidades: any[] = [];
    data.Modalidades[0].forEach((element: any) => {
      modalidades.push({
        IdModalidadSeleccion: element.Id,
        Activo: true,
      });
    });
    return modalidades;
  }
  CrearElementosARKA(data: any) {
    const elementosARKA: any[] = [];
    data.ElementosARKA[0].forEach((element: any) => {
      elementosARKA.push({
        CodigoARKA: element.Id.toString(),
        Activo: true,
      });
    });
    return elementosARKA;
  }
  CrearActividades(data: any) {
    const actividades: any[] = [];
    data.Actividades[0].forEach((element: any) => {
      actividades.push({
        ActividadId: element.ActividadId.Id,
        ValorAsignado: element.Valor,
        Activo: true,
        FuentesFinanciamiento: this.CrearFuentes(element),
      });
    });
    return actividades;
  }
  CrearFuentes(element: any) {
    const fuentes: any[] = [];
    element.FuentesFinanciamiento.forEach((fuente: any) => {
      fuentes.push({
        FuenteFinanciamientoId: fuente.Codigo,
        Activo: true,
        ValorAsignado: fuente.Valor,
      });
    });
    return fuentes;
  }
}
