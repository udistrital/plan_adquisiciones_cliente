import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getModalidadesSeleccion } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-datos-generales',
  templateUrl: './seleccion-datos-generales.component.html',
  styleUrls: ['./seleccion-datos-generales.component.scss']
})
export class SeleccionDatosGeneralesComponent implements OnInit {

  DatosGeneralesForm: any;

  ModalidadSeleccion: any;
  Responsables: any;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroPlanAdquisicionesService,

  ) {
    
    this.DatosGeneralesForm = this.fb.group({
      FechaInicioSeleccion: [null, [Validators.required]],
      Responsable: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    
    // this.registroService.getModalidadesDeSeleccion().subscribe((data) => {
    //   this.ModalidadSeleccion = data;
    // });
    this.registroService.getResponsables().subscribe((data) => {
      this.Responsables = data;
    });
  }

  ver() {
    const start: Date = this.DatosGeneralesForm.value.FechaInicioSeleccion.start;
    console.log(start)
    console.log(this.getDays(start));

  }

  getDays(date: Date) {

    const m = date.getMonth()
    const y = date.getFullYear()
    console.log(m, y)

    switch (true) {
      case m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 11:
        return 31;
      case m === 3 || m === 5 || m === 8 || m === 10:
        return 30;
      case m === 1:
        if (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0)) {
          return 29;
        } else {
          return 28;
        }
    }
  }
}
