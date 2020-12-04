import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getVigenciaActual, getAreaFuncional } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_PRUEBA_4, DATOS_PRUEBA } from '../../interfaces/interfaces';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-form-fuentes-financiamiento',
  templateUrl: './form-fuentes-financiamiento.component.html',
  styleUrls: ['./form-fuentes-financiamiento.component.scss']
})
export class FormFuentesFinanciamientoComponent implements OnInit, OnDestroy {

  titulo: string;
  boton: string;
  FuentesFinanciamiento: any;
  FuenteFinanciamientoForm: FormGroup;
  subscription$: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private renderer: Renderer2,
    private matDialogRef: MatDialogRef<FormFuentesFinanciamientoComponent>,
    private registroService: RegistroPlanAdquisicionesService,
  ) {
    this.titulo = 'Agregar Fuente';
    this.boton = 'Crear';
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {

    this.CrearFuenteFinanciamientoForm(null);
    this.subscription$ = combineLatest([
      this.store.select(getVigenciaActual),
      this.store.select(getAreaFuncional),
    ]).subscribe(([vigencia, area]) => {
      if (vigencia && area) {
        const query = {
          Vigencia: vigencia[0].valor,
          UnidadEjecutora: area.Id,
        };
        this.registroService.getFuentesFinanciamiento(null, query).subscribe((fuente: any) => {
          this.FuentesFinanciamiento = fuente;
        });
      }
    });

    this.FuenteFinanciamientoForm.valueChanges.subscribe((data: any) => {
    });
  }
  CrearFuenteFinanciamientoForm(data: any) {
    if (data) {
      this.FuenteFinanciamientoForm = this.fb.group({
        FuenteSeleccionada: [null, []],
        Porcentaje: [null, []],
      });
    } else {
      this.FuenteFinanciamientoForm = this.fb.group({
        FuenteSeleccionada: [null, []],
        Porcentaje: [null, []],
      });
    }
  }

  OnClose() {
    this.matDialogRef.close();
  }

  OnSubmit() {
  }
}
