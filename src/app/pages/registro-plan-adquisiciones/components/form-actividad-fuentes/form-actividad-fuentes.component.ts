import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { getMeta } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-form-actividad-fuentes',
  templateUrl: './form-actividad-fuentes.component.html',
  styleUrls: ['./form-actividad-fuentes.component.scss']
})
export class FormActividadFuentesComponent implements OnInit {

  titulo: string;
  boton: string;
  Actividades: any;
  ActividadFuentesForm: any;
  subscription$: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private actividadesService: ActividadesService,
  ) {
    this.titulo = 'Agregar Actividad';
    this.boton = 'Crear';
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getMeta).subscribe((meta: any) => {
      console.log(meta)
      if (meta) {
        if (Object.keys(meta)[0] !== 'type') {
          this.actividadesService.getActividadesAsociadas(meta.Id).subscribe((actividades: any) => {
            if (Object.keys(actividades[0]).length !== 0) {
              this.Actividades = actividades;
            }
          })
        }
      }
    })
    this.CrearActividadFuentesForm(null);
  }
  CrearActividadFuentesForm(data: any) {
    if (data) {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [null,[]],
        RegistroPlanAdquisicionesId: [null,[]],
        Valor: [null,[]],
      });
    } else {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [null,[]],
        RegistroPlanAdquisicionesId: [null,[]],
        Valor: [null,[]],
      });
    }
  }

  OnSubmit() {
    console.log(this.ActividadFuentesForm.value)
  }

}
