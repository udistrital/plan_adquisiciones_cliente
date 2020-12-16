import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  titulo: any;
  TipoDePlan: any;

  constructor(
    private store: Store<any>,
  ) {
    this.titulo = 'Creacion Plan de Adquisiciones';
    this.TipoDePlan = true;
  }

  ngOnInit() {
  }

}
