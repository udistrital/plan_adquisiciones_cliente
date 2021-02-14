import { Component, OnInit } from '@angular/core';
// import { PlanesService } from '../../../planes/services/planes.service';
// import { CONFIGURACION_PRUEBA, CONFIGURACION_PRUEBA_2 } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-componente-prueba',
  templateUrl: './componente-prueba.component.html',
  styleUrls: ['./componente-prueba.component.scss']
})
export class ComponentePruebaComponent implements OnInit {

  configuracion: any;
  configuracion2: any;
  datosPrueba: any;
  datosPrueba2: any;
  constructor(
  ) {
  }
  ngOnInit() {

  }
}
