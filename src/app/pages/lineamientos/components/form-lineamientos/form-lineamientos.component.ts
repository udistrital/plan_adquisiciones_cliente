import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-lineamientos',
  templateUrl: './form-lineamientos.component.html',
  styleUrls: ['./form-lineamientos.component.scss']
})
export class FormLineamientosComponent implements OnInit {

  titulo: any;

  constructor() {
    this.titulo = 'Crear / Editar Lineamiento'
  }

  ngOnInit() {
  }

}
