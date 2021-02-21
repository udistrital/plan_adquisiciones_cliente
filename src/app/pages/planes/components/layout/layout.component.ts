import { Component, OnInit } from '@angular/core';
import { ParametricService } from '../../../../shared/services/parametric.service';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private parametrics: ParametricService,
  ) {
    this.parametrics.CargarArbolRubros('3');
  }

  ngOnInit() {
  }

}
