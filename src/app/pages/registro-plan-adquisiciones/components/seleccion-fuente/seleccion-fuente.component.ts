import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { GetVigenciaActual } from '../../../../shared/actions/shared.actions';
import { getAreaFuncional, getVigenciaActual } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarActividadFuente, SeleccionarFuente } from '../../actions/registro-plan-adquisiciones.actions';
import { getActividadFuente, getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-fuente',
  templateUrl: './seleccion-fuente.component.html',
  styleUrls: ['./seleccion-fuente.component.scss']
})
export class SeleccionFuenteComponent implements OnInit, OnDestroy {

  FuentesFinanciamiento: any;
  FuenteForm: any;
  subscription$: any;
  Actividades: any;
  subscription2$: any;
  subscription3$: any;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private fb: FormBuilder,
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    this.store.dispatch(GetVigenciaActual({ offset: null }));
    this.Actividades = [];
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getVigenciaActual),
      this.store.select(getAreaFuncional),
      this.store.select(getRenglonSeleccionado),
    ]).subscribe(([vigencia, area, renglon]) => {
      if (vigencia && area) {
        const query = {
          Vigencia: vigencia[0].valor,
          UnidadEjecutora: area.Id,
        };
        this.registroService.getFuentesFinanciamiento(null, query).subscribe((fuente: any) => {
          this.FuentesFinanciamiento = fuente;
          if (this.sharedService.IfStore(renglon)) {
            if (renglon[0]['FuenteFinanciamientoId'] !== '') {
              this.CrearFuenteForm(renglon[0]);
            } else {
              this.CrearFuenteForm(null);
            }
          } else {
            this.CrearFuenteForm(null);
          }
        });
      }
    });

    this.subscription2$ = this.store.select(getActividadFuente).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {

        //   this.Datos = elementos[0];
        // } else {
        //   this.Datos = [];
      }
    });
  }

  CrearFuenteForm(data: any) {
    if (data) {
      this.FuenteForm = this.fb.group({
        Actividad: [null, [Validators.required]],
        Valor: [0, [Validators.required]],
        FuenteFinanciamiento: [null, [Validators.required]],
      });
      this.FuenteForm.valueChanges.subscribe((value: any) => {
        this.store.dispatch(CargarActividadFuente(value));
      });
    } else {
      this.FuenteForm = this.fb.group({
        Actividad: [null, [Validators.required]],
        Valor: [0, [Validators.required]],
        FuenteFinanciamiento: [null, [Validators.required]],
      });
      this.FuenteForm.valueChanges.subscribe((value: any) => {
        this.store.dispatch(CargarActividadFuente(value));
      });
    }

  }

}
