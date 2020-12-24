import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getModalidadesSeleccion } from '../../../../shared/selectors/shared.selectors';
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
export class SeleccionDatosGeneralesComponent implements OnInit {

  DatosGeneralesForm: FormGroup;

  ModalidadSeleccion: any;
  Responsables: any;
  subscription$: any;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroPlanAdquisicionesService,
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
  }

  ngOnInit() {

    this.subscription$ = combineLatest([
      this.store.select(getRenglonSeleccionado),
      this.registroService.getResponsables()
    ]).subscribe(([renglon, data]) => {
      this.Responsables = data;
      if (this.sharedService.IfStore(renglon) && data) {
        this.CrearFormulario(renglon);
      } else {
        this.CrearFormulario();
      }
    });
  }
  CrearFormulario(renglon?: any) {
    if (renglon) {
      const responsable = this.Responsables.find((x: any) => x.Id === renglon[0].ResponsableId);
      const fechaSeleccion = {
        start: new Date(renglon[0].FechaEstimadaInicio),
        end: new Date(renglon[0].FechaEstimadaFin)
      }
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
      this.store.dispatch(SeleccionarFechaSeleccion(value));
    });
    this.DatosGeneralesForm.get('Responsable').valueChanges.subscribe((value: any) => {
      this.store.dispatch(SeleccionarResponsable(value));
    });
  }
}
