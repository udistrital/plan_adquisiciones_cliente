import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  titulo: any;
  constructor(
    private route: Router,
  ) {
    this.titulo = 'LINEAMIENTOS';
  }

  ngOnInit() {
    this.route.navigate(['pages/plan-adquisiciones/metas']);
  }

}
