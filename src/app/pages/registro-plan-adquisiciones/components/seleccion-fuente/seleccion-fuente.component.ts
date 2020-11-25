import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-fuente',
  templateUrl: './seleccion-fuente.component.html',
  styleUrls: ['./seleccion-fuente.component.scss']
})
export class SeleccionFuenteComponent implements OnInit {

  FuentesFinanciamiento: any;
  FuenteForm: any;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private fb: FormBuilder,
  ) {
    this.FuenteForm = this.fb.group({
      fuenteSeleccionada: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.registroService.getFuentesFinanciamiento().subscribe((fuente: any) => {
      // console.log(fuente)
      this.FuentesFinanciamiento = fuente;
    });
  }

}
