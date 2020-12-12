import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getVigenciaActual, getAreaFuncional } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarFuentes, SeleccionarFuente } from '../../actions/registro-plan-adquisiciones.actions';
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
  FuentesAsociadas: any;
  valoresFuentes: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<any>,
    private matDialogRef: MatDialogRef<FormFuentesFinanciamientoComponent>,
    private registroService: RegistroPlanAdquisicionesService,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Agregar Fuente';
    this.boton = 'Crear';
    this.FuentesAsociadas = [];
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

      if (this.sharedService.IfStore(fuentes)) {
        this.FuentesAsociadas = fuentes[0];
        this.valoresFuentes = fuentes[0].reduce((acc: any, value: any) => acc + value.Valor, 0);
      }

      if (vigencia && area) {
        const query = {
          Vigencia: vigencia[0].valor,
          UnidadEjecutora: area.Id,
        };
        this.CalcularValorMaximo(fuente, fuentes);
        this.registroService.getFuentesFinanciamiento(null, query).subscribe((fuentesAsociadas: any) => {
          this.FuentesFinanciamiento = fuentesAsociadas;
          if (this.sharedService.IfStore(fuente)) {
            this.CrearFuenteFinanciamientoForm(fuente);
            this.titulo = 'Editar Fuente';
            this.boton = 'Editar';
          } else {
            this.CrearFuenteFinanciamientoForm(null);
            this.titulo = 'Agregar Fuente';
            this.boton = 'Crear';
          }
        });
      }
    });
  }
  CrearFuenteFinanciamientoForm(data: any) {
    if (data) {
      this.FuenteFinanciamientoForm = this.fb.group({});
      this.FuenteFinanciamientoForm = this.fb.group({
        FuenteSeleccionada: [
          {
            value: this.FuentesFinanciamiento.find((element: any) => element.Codigo === data.Codigo),
            disabled: true,
          },
          [Validators.required]
        ],
        Valor: [data.Valor, [Validators.max(this.ValorDisponible), Validators.required]],
      });
    } else {
      this.FuenteFinanciamientoForm = this.fb.group({
        FuenteSeleccionada: [null, [Validators.required]],
        Valor: [null, [Validators.max(this.ValorDisponible), Validators.required]],
      });
    }
  }

  OnClose() {
    this.matDialogRef.close();
  }

  CalcularValorMaximo(fuente: any, fuentes: any) {

    if (this.sharedService.IfStore(fuente)) {
      if (this.sharedService.IfStore(fuentes)) {
        // Edicion con fuentes Adicionales
        this.ValorDisponible = this.data.Valor - this.valoresFuentes + fuente.Valor;
      }
    } else {
      if (this.sharedService.IfStore(fuentes)) {
        // Creacion con fuentes
        this.ValorDisponible = this.data.Valor - this.valoresFuentes;
      } else {
        // Creacion sin fuentes
        this.ValorDisponible = this.data.Valor;
      }
    }
  }

  EnableFuente() {
    this.FuenteFinanciamientoForm.get('FuenteSeleccionada').enable();
  }

  OnSubmit() {
    this.EnableFuente();
    let Creacion = true;
    const Fuente: any = this.FuenteFinanciamientoForm.value;
    Fuente.FuenteSeleccionada.Valor = Fuente.Valor;
    Fuente.FuenteSeleccionada.Porcentaje = Fuente.Valor / this.data.Valor;

    // Revisar las Fuentes ya asociadas, y si existe cambiar los valores

    this.FuentesAsociadas.forEach((element: any) => {
      if (Fuente.FuenteSeleccionada.Codigo === element.Codigo) {
        element.Valor = Fuente.Valor;
        element.Porcentaje = Fuente.FuenteSeleccionada.Porcentaje;
        Creacion = false;
      }
    });

    // Si existe una creacion, agregar el emenemto creado
    if (Creacion) {
      this.FuentesAsociadas.push(Fuente.FuenteSeleccionada);
    }

    // Actualizar Fuente y enviar datos
    this.store.dispatch(CargarFuentes([this.FuentesAsociadas]));
    this.store.dispatch(SeleccionarFuente(null));
  }
}
