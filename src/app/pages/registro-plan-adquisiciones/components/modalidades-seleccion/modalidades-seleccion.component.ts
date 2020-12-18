import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { DATOS_PRUEBA } from '../../interfaces/interfaces';
import { getModalidadesSeleccion } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { CargarModalidades } from '../../actions/registro-plan-adquisiciones.actions';
import { getModalidades } from '../../selectors/registro-plan-adquisiciones.selectors';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'ngx-modalidades-seleccion',
  templateUrl: './modalidades-seleccion.component.html',
  styleUrls: ['./modalidades-seleccion.component.scss']
})
export class ModalidadesSeleccionComponent implements OnInit {

  ModalidadesSeleccionForm: FormGroup;
  Datos: any[];
  Parametros: any;
  subscription$: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private parametricService: ParametricService,
    private sharedService: SharedService,
  ) {
    this.Parametros = [];
    this.parametricService.CargarModalidadesDeSeleccion();
    // this.store.dispatch(CargarModalidades([DATOS_PRUEBA]));
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getModalidadesSeleccion),
      this.store.select(getModalidades),
    ]).subscribe(([modalidades, datos]) => {
      this.Datos = [];
      this.Parametros = [];
      this.ModalidadesSeleccionForm = undefined;
      if (
        this.sharedService.IfStore(modalidades) &&
        this.sharedService.IfStore(datos)
      ) {
        this.Datos = datos[0];
        modalidades[0].forEach((element: any) => {
          if (datos[0].find((data: any) => data.Id === element.Id) === undefined) {
            this.Parametros.push(element);
          }
        });
      } else {
        if (this.sharedService.IfStore(modalidades)) {
          this.Parametros = modalidades[0];
        }
      }
      this.ModalidadesSeleccionForm = this.fb.group({
        Valor: [null, [Validators.required]]
      });

    });
  }

  AgregarModalidad() {
    if (this.ModalidadesSeleccionForm.valid) {
      this.Datos.push(this.ModalidadesSeleccionForm.value.Valor);
      this.store.dispatch(CargarModalidades([this.Datos]));
    }
  }

  RemoverModalidad(index: any) {
    this.Datos.splice(index, 1);
    this.store.dispatch(CargarModalidades([this.Datos]));
  }
}
