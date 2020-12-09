import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getVigenciaActual, getAreaFuncional } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_PRUEBA_4, DATOS_PRUEBA } from '../../interfaces/interfaces';
import { getFuentes, getFuenteSeleccionada } from '../../selectors/registro-plan-adquisiciones.selectors';
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
  ValorDisponible: any;
  subscription2$: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getVigenciaActual),
      this.store.select(getAreaFuncional),
      this.store.select(getFuentes),
      this.store.select(getFuenteSeleccionada),
    ]).subscribe(([vigencia, area, fuentes, fuente]) => {
      console.log([vigencia, area, fuentes, fuente])
      if (vigencia && area) {
        const query = {
          Vigencia: vigencia[0].valor,
          UnidadEjecutora: area.Id,
        };
        this.CalcularValorMaximo(fuente, fuentes);
        this.registroService.getFuentesFinanciamiento(null, query).subscribe((fuentesAsociadas: any) => {
          console.log(fuentesAsociadas)
          this.FuentesFinanciamiento = fuentesAsociadas;
          if (fuente) {
            if (Object.keys(fuente)[0] !== 'type') {
              this.CrearFuenteFinanciamientoForm(fuente);
            } else {
              this.CrearFuenteFinanciamientoForm(null);
            }
          } else {
            this.CrearFuenteFinanciamientoForm(null);
          }
        });
      }
    });
  }
  CrearFuenteFinanciamientoForm(data: any) {
    if (data) {
      this.FuenteFinanciamientoForm = this.fb.group({
        FuenteSeleccionada: [
          this.FuentesFinanciamiento.find((element: any) => element.Id === data.Id), [Validators.required]
        ],
        Valor: [data.Valor, [Validators.max(this.ValorDisponible), Validators.required]],
      });
    } else {
      this.FuenteFinanciamientoForm = this.fb.group({
        FuenteSeleccionada: [null, [Validators.required]],
        Valor: [null, [Validators.max(this.ValorDisponible), Validators.required]],
      });
    }
    console.log(this.FuenteFinanciamientoForm)
  }

  OnClose() {
    this.matDialogRef.close();
  }

  CalcularValorMaximo(fuente: any, fuentes: any) {

    let valoresFuentes: any;
    // Acumulado
    if (fuentes) {
      if (Object.keys(fuentes)[0] !== 'type') {
        valoresFuentes = fuentes[0].reduce((acc: any, value: any) => acc + value.Valor, 0);
      }
    }

    if (fuente) {
      if (Object.keys(fuente)[0] !== 'type') {
        if (fuentes) {
          if (Object.keys(fuentes)[0] !== 'type') {
            // Edicion con fuentes Adicionales
            this.ValorDisponible = this.data.Valor - valoresFuentes + fuente.Valor;
          }
        }
      } else {
        if (fuentes) {
          if (Object.keys(fuentes)[0] !== 'type') {
            // Creacion con fuentes
            this.ValorDisponible = this.data.Valor - valoresFuentes;
          } else {
            // Creacion sin fuentes
            this.ValorDisponible = this.data.Valor;
          }
        } else {
          this.ValorDisponible = this.data.Valor;
        }
      }
    } else {
      if (fuentes) {
        if (Object.keys(fuentes)[0] !== 'type') {
          // Creacion con fuentes
          this.ValorDisponible = this.data.Valor - valoresFuentes;
        } else {
          // Creacion sin fuentes
          this.ValorDisponible = this.data.Valor;
        }
      } else {
        this.ValorDisponible = this.data.Valor;
      }
    }

  }

  OnSubmit() {

  }
}
