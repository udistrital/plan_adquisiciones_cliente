import { Component, OnInit } from '@angular/core';
import { PlanesService } from '../../../planes/services/planes.service';
import { CONFIGURACION_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-componente-prueba',
  templateUrl: './componente-prueba.component.html',
  styleUrls: ['./componente-prueba.component.scss']
})
export class ComponentePruebaComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  constructor(
    private planesService: PlanesService
  ) {
    // this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }
  ngOnInit() {
    this.planesService.getPlanDetallado(7).subscribe((data: any) => {
      this.datosPrueba = data;
      console.log(this.datosPrueba)
    })
  }
}
