import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-metas',
  templateUrl: './form-metas.component.html',
  styleUrls: ['./form-metas.component.scss']
})
export class FormMetasComponent implements OnInit {

  titulo: any;

  constructor() {
    this.titulo = 'Crear / Editar Meta';
  }


  ngOnInit() {
  }

}
