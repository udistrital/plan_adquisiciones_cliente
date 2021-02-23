import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '@ngrx/store';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  Mostrar: boolean;
  titulo: any;
  constructor(
    private state: State<any>,
    private route: Router
  ) {
    this.titulo = 'ACTIVIDADES';
  }

  ngOnInit() {
    if (Object.keys(this.state.getValue()).find(key => key === 'metas') === undefined) {
      this.route.navigate(['pages/plan-adquisiciones/metas']);
    } else {
      this.Mostrar = true;
    }
  }

}
