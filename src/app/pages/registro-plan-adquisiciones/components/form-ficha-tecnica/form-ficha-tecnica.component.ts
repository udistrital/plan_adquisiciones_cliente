import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { getPlanSeleccionado } from '../../../planes/selectors/planes.selectors';
import { ActualizarRenglonFicha, CrearRenglonFicha } from '../../actions/registro-plan-adquisiciones.actions';
import { getFichaSeleccionada, getRubro } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-form-ficha-tecnica',
  templateUrl: './form-ficha-tecnica.component.html',
  styleUrls: ['./form-ficha-tecnica.component.scss']
})
export class FormFichaTecnicaComponent implements OnInit {

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

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getPlanSeleccionado),
      this.store.select(getRubro),
      this.store.select(getFichaSeleccionada)
    ]).subscribe(([plan, rubro, ficha]) => {
      if (
        this.sharedService.IfStore(plan) &&
        this.sharedService.IfStore(rubro)
      ) {
        this.metaService.getMetasRubro(rubro.Codigo).subscribe((metas) => {
          this.Metas = metas;
          if (this.sharedService.IfStore(ficha)) {
            this.CrearFormulario(plan, rubro, ficha);
          } else {
            this.CrearFormulario(plan, rubro, null);
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
}
