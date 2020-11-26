import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      FechaInicioSeleccion2: [null, [Validators.required]],
      Responsable: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.registroService.getModalidadesDeSeleccion().subscribe((data) => {
      this.ModalidadSeleccion = data;
    });
    this.registroService.getResponsables().subscribe((data) => {
      this.Responsables = data;
    });
  }
}
