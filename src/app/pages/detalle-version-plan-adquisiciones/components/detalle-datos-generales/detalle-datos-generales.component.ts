import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getModalidadesSeleccion } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'ngx-detalle-datos-generales',
  templateUrl: './detalle-datos-generales.component.html',
  styleUrls: ['./detalle-datos-generales.component.scss']
})
export class DetalleDatosGeneralesComponent implements OnInit {

  @Input() datos: any;
  modalidades: any;
  subscription$: any;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
