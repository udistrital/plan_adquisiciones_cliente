import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-detalle-rubro',
  templateUrl: './detalle-rubro.component.html',
  styleUrls: ['./detalle-rubro.component.scss']
})
export class DetalleRubroComponent implements OnInit {


  @Input() datos: any;
  fuente: any;

  constructor() {
  }

  ngOnInit() {
    this.fuente = this.datos.split('-')[0] + '-' + this.datos.split('-')[1];
  }

}
