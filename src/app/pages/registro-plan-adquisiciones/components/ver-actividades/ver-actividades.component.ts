import { Component, Input, OnInit } from '@angular/core';
import { CONFIGURACION_TABLA_VER_ACTIVIDADES } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-ver-actividades',
  templateUrl: './ver-actividades.component.html',
  styleUrls: ['./ver-actividades.component.scss']
})
export class VerActividadesComponent implements OnInit {

  @Input() datos: any;
  DatosTransformados: any;
  configuracion: any;

  constructor() {
    this.configuracion = CONFIGURACION_TABLA_VER_ACTIVIDADES;
  }

  ngOnInit() {
    this.DatosTransformados = this.datos.map((element: any) => {
      return {
        Numero2: element.Numero + '.' + element.MetaId.Numero,
        ...element
      };
    });
  }

}
