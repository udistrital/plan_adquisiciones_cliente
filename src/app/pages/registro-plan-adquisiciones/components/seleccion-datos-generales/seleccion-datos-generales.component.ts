import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { getModalidadesSeleccion, getResponsables } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { SeleccionarFechaSeleccion, SeleccionarResponsable } from '../../actions/registro-plan-adquisiciones.actions';
import { getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-datos-generales',
  templateUrl: './seleccion-datos-generales.component.html',
  styleUrls: ['./seleccion-datos-generales.component.scss']
})
export class SeleccionDatosGeneralesComponent implements OnInit, OnDestroy {

  DatosGeneralesForm: FormGroup;

  ModalidadSeleccion: any;
  Responsables: any[];
  subscription$: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private sharedService: SharedService,
    private parametricService: ParametricService,
    private popUpService: PopUpManager,
  ) {
    this.parametricService.CargarResponsables();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {

    this.subscription$ = combineLatest([
      this.store.select(getRenglonSeleccionado),
      this.store.select(getResponsables),
    ]).subscribe(([renglon, data]) => {
      if (this.sharedService.IfStore(data)) {
        this.Responsables = JSON.parse(JSON.stringify(data[0]));
        if (this.sharedService.IfStore(renglon)) {
          this.CrearFormulario(renglon);
        } else {
          this.CrearFormulario();
        }
      }
    });
  }
  CrearFormulario(renglon?: any) {
    if (renglon) {
      const responsable = this.Responsables.find((x: any) => x.Id === renglon[0].ResponsableId);
      this.Responsables.unshift(responsable);
      const fechaSeleccion = {
        start: new Date(renglon[0].FechaEstimadaInicio),
        end: new Date(renglon[0].FechaEstimadaFin)
      };
      this.store.dispatch(SeleccionarFechaSeleccion(fechaSeleccion));
      this.store.dispatch(SeleccionarResponsable(responsable));
      this.DatosGeneralesForm = this.fb.group({
        FechaInicioSeleccion: [fechaSeleccion, [Validators.required]],
        Responsable: [responsable, [Validators.required]],
      });
    } else {
      this.DatosGeneralesForm = this.fb.group({
        FechaInicioSeleccion: [null, [Validators.required]],
        Responsable: [null, [Validators.required]],
      });
    }
    this.DatosGeneralesForm.get('FechaInicioSeleccion').valueChanges.subscribe((value: any) => {
      if (value && value.start && value.end) {
        if (this.sharedService.DuracionLimite(value)) {
          this.store.dispatch(SeleccionarFechaSeleccion(value));
        } else {
          this.popUpService.showInfoAlert('La duracion estimada no debe superar un (1) año', 'Error');
          this.store.dispatch(SeleccionarFechaSeleccion(null));
          this.DatosGeneralesForm.get('FechaInicioSeleccion').setValue(null, {emitEvent: false});
        }
      }
    });
    this.DatosGeneralesForm.get('Responsable').valueChanges.subscribe((value: any) => {
      this.store.dispatch(SeleccionarResponsable(value));
    });
  }
}
