import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadAreaFuncional, LoadCentroGestor } from '../../../../shared/actions/shared.actions';
import { getAreaFuncional, getCentroGestor } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { CrearRenglonPlan } from '../../actions/registro-plan-adquisiciones.actions';
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
        this.store.dispatch(LoadAreaFuncional({Id: renglon[0].AreaFuncional}));
        this.store.dispatch(LoadCentroGestor({CentroGestor: renglon[0].CentroGestor}))
      }
    })
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
    NuevoRegistro.ProductoId = data.Producto._id;
    NuevoRegistro.RubroId = data.Rubro.data.Codigo;
    NuevoRegistro.FechaEstimadaInicio = this.sharedService.ConvertirFecha(data.FechaSeleccion.start.toISOString());
    NuevoRegistro.FechaEstimadaFin = this.sharedService.ConvertirFecha(data.FechaSeleccion.end.toISOString());
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
        IdModalidadSeleccion: element.Id.toString(),
        Activo: true,
      });
    });
    return modalidades;
  }
  CrearElementosARKA(data: any) {
    const elementosARKA: any[] = [];
    data.ElementosARKA[0].forEach((element: any) => {
      elementosARKA.push({
        CodigoArka: element.Id.toString(),
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
        Valor: element.Valor,
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
