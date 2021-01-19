import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { ActualizarRenglonFicha, CrearRenglonFicha } from '../../actions/registro-plan-adquisiciones.actions';
import { getFichaSeleccionada, getFichaTecnica, getRubro } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-form-ficha-tecnica',
  templateUrl: './form-ficha-tecnica.component.html',
  styleUrls: ['./form-ficha-tecnica.component.scss']
})
export class FormFichaTecnicaComponent implements OnInit, OnDestroy {

  FichaTecnicaForm: FormGroup;
  titulo: any;
  boton: any;
  subscription$: any;
  Metas: any;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FormFichaTecnicaComponent>,
    private sharedService: SharedService,
    private metaService: MetasService,
    // private route: Router,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getPlanSeleccionado),
      this.store.select(getRubro),
      this.store.select(getFichaSeleccionada),
      this.store.select(getFichaTecnica)
    ]).subscribe(([plan, rubro, ficha, fichaTecnica]) => {
      if (
        this.sharedService.IfStore(plan) &&
        this.sharedService.IfStore(rubro) &&
        this.sharedService.IfStore(fichaTecnica)
      ) {
        this.metaService.getMetasRubro(rubro.data.Codigo).subscribe((metas) => {
          if (this.sharedService.IfStore(ficha)) {
            this.Metas = metas;
            this.CrearFormulario(plan, rubro, ficha);
          } else {
            this.Metas = this.CargarMetas(metas, fichaTecnica[0]);
            if (Object.keys(this.Metas).length !== 0) {
              this.CrearFormulario(plan, rubro, null);
            } else {
              this.MetasAsignadas();
            }
          }
        });
      }
    });
  }
  OnClose() {
    this.matDialogRef.close();
  }
  OnSubmit() {
    const value = this.FichaTecnicaForm.value;

    if (value.Id === null) {
      this.store.dispatch(CrearRenglonFicha(value));
    } else {
      this.store.dispatch(ActualizarRenglonFicha(value));
    }
  }

  CrearFormulario(plan: any, rubro: any, ficha?: any) {
    if (ficha) {
      this.titulo = 'Actualizar Renglon para Ficha de Estadisticas';
      this.boton = 'Actualizar';
      this.FichaTecnicaForm = this.fb.group({
        Id: [ficha.Id, []],
        MetaId: [
          {
            value: this.Metas.find((x: any) => x.Id === ficha.MetaId).Id,
            disabled: true,
          },
          [Validators.required]
        ],
        Proceso: [ficha.Proceso, [Validators.required]],
        Magnitud: [ficha.Magnitud, [Validators.required]],
        UnidadMedida: [ficha.UnidadMedida, [Validators.required]],
        Descripcion: [ficha.Descripcion, [Validators.required]],
        Activo: [ficha.Activo, []],
        Rubro: [rubro.Codigo, []],
        PlanAdquisicionesId: [plan, []],
        FechaCreacion: [ficha.FechaCreacion, []],
        FechaModificacion: [ficha.FechaModificacion, []]
      });
    } else {
      this.titulo = 'Crear Renglon para Ficha de Estadisticas';
      this.boton = 'Crear';
      this.FichaTecnicaForm = this.fb.group({
        Id: [null, []],
        MetaId: [null, [Validators.required]],
        Proceso: [null, [Validators.required]],
        Magnitud: [null, [Validators.required]],
        UnidadMedida: [null, [Validators.required]],
        Descripcion: [null, [Validators.required]],
        Activo: [true, []],
        Rubro: [rubro.Codigo, []],
        PlanAdquisicionesId: [plan, []],
      });
    }
  }
  CargarMetas(metas: any[], ficha: any[]) {

    if (Object.keys(ficha[0]).length !== 0) {
      const data: any[] = [];
      metas.map((element: any) => {
        if (ficha.find((x: any) => x.MetaId === element.Id) === undefined) {
          data.push(element);
        }
      });
      return data;
    } else {
      return metas;
    }
  }
  MetasAsignadas() {
    Swal.fire({
      type: 'info',
      title: 'Metas Asignadas',
      text: `Todas las metas asociadas han sido asignadas`,
      confirmButtonText: 'Aceptar',
    }).then(() => {
      this.OnClose();
    });

  }
}
