import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.scss']
})
export class FormActividadesComponent implements OnInit {

  titulo: any;

  constructor() {
    this.titulo = 'Crear / Editar Actividad';
  }


  ngOnInit() {
  }

}
