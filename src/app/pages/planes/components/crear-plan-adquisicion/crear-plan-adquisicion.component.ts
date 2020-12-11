import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetVigenciaActual, LoadAccionTabla } from '../../../../shared/actions/shared.actions';
import { getPlanSeleccionado } from '../../selectors/planes.selectors';
import { combineLatest } from 'rxjs';
import { getVigenciaActual } from '../../../../shared/selectors/shared.selectors';
import { CrearPlan, ActualizarPlan } from '../../actions/planes.actions';

@Component({
  selector: 'ngx-crear-plan-adquisicion',
  templateUrl: './crear-plan-adquisicion.component.html',
  styleUrls: ['./crear-plan-adquisicion.component.scss']
})
export class CrearPlanAdquisicionComponent implements OnInit, OnDestroy {

  titulo: any;
  subscription$: any;

  PlanForm: FormGroup;
  boton: string;
  Vigencia: any;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private route: Router,
  ) {
    this.titulo = 'Crear Nuevo Plan de Adquisiciones';
    this.store.dispatch(GetVigenciaActual({offset: null}));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getPlanSeleccionado),
      this.store.select(getVigenciaActual),
    ]).subscribe(([plan, vigencia]) => {
      
      if (plan && vigencia) {
        console.log(plan, vigencia.Valor);
        this.Vigencia = vigencia;
        if (Object.keys(plan)[0] === 'type') {
          this.CrearPlanForm(null);
        } else {
          this.CrearPlanForm(plan);
        }
      }
    });
  }

  CrearPlanForm(plan?: any) {
    if (plan) {
      this.titulo = 'Editar Datos Generales Plan de Adquisiciones';
      this.boton = 'Editar';
      this.PlanForm = this.fb.group({
        Activo: [plan.Activo, []],
        FechaCreacion: [plan.FechaCreacion, []],
        FechaModificacion: [plan.FechaModificacion, []],
        Id: [plan.Id, []],
        Descripcion: [plan.Descripcion, [Validators.required]],
        Vigencia: [plan.Vigencia, [Validators.required]],
        Publicado: [plan.Publicado,[]],
      });
    } else {
      this.titulo = 'Crear Nuevo Plan de Adquisiciones';
      this.boton = 'Crear';
      this.PlanForm = this.fb.group({
        Activo: [true, []],
        FechaCreacion: ['', []],
        FechaModificacion: ['', []],
        Id: [null, []],
        Descripcion: ['', [Validators.required]],
        Vigencia: [this.Vigencia.Valor, [Validators.required]],
        Publicado: [false,[]]
      });
    }
  }

  OnSubmit() {
    const Plan: any = this.PlanForm.value;
    if (Plan.Id === null) {
      this.store.dispatch(CrearPlan(Plan));
    } else {
      this.store.dispatch(ActualizarPlan(Plan));
    }
  }
  OnCancel() {
    this.store.dispatch(LoadAccionTabla(null));
    this.route.navigate(['pages/plan-adquisiciones/planes/tabla-general']);
  }

}
