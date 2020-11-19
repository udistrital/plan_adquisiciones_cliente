import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadAccionTabla } from '../../../../shared/actions/shared.actions';
import { getPlanSeleccionado } from '../../selectors/planes.selectors';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ngx-crear-plan-adquisicion',
  templateUrl: './crear-plan-adquisicion.component.html',
  styleUrls: ['./crear-plan-adquisicion.component.scss']
})
export class CrearPlanAdquisicionComponent implements OnInit {

  titulo: any;
  subscription$: any;

  PlanForm: FormGroup;
  boton: string;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private route: Router,
  ) {
    this.titulo = 'Crear Nuevo Plan de Adquisiciones';
  }
  // ngOnDestroy(): void {
  //   this.subscription$.unsubscribe();
  // }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getPlanSeleccionado),
    ]).subscribe(([plan]) => {
      if (plan) {
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
        Vigencia: ['', [Validators.required]],
      });
    }
  }

  OnSubmit() {
    // const actividad: any = this.PlanForm.value;
    // if (actividad.Id === null) {
    //   this.store.dispatch(CrearActividad(actividad));
    // } else {
    //   this.store.dispatch(ActualizarActividad(actividad));
    // }
  }
  OnCancel() {
    this.store.dispatch(LoadAccionTabla(null));
    this.route.navigate(['pages/plan-adquisiciones/planes/tabla-general']);
  }

}
