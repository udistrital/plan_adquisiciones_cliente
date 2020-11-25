import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-seleccion-datos-generales',
  templateUrl: './seleccion-datos-generales.component.html',
  styleUrls: ['./seleccion-datos-generales.component.scss']
})
export class SeleccionDatosGeneralesComponent implements OnInit {
  DatosGeneralesForm: any;

  constructor(
    private fb: FormBuilder,
  ) {
    this.DatosGeneralesForm = this.fb.group({
      FechaInicioSeleccion: [null, [Validators.required]],
      FechaInicioSeleccion2: [null, [Validators.required]],
    })
  }

  ngOnInit() {
  }

  ver() {
    console.log(this.DatosGeneralesForm.value)
  }
}
