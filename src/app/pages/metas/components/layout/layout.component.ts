import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  titulo: any;
  Mostrar: boolean;
  constructor(
    private state: State<any>,
    private route: Router
  ) {
    this.titulo = 'METAS';
  }

  ngOnInit() {
    if (Object.keys(this.state.getValue()).find(key => key === 'lineamientos') === undefined) {
      this.route.navigate(['pages/plan-adquisiciones/lineamientos']);
    } else {
      this.Mostrar = true;
    }
  }

}
