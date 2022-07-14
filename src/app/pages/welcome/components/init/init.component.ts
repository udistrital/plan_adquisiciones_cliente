import { Component } from '@angular/core';
import { ParametricService } from '../../../../shared/services/parametric.service';

@Component({
  selector: 'ngx-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent {
  constructor(
    private parametric: ParametricService
  ) {
    parametric.CargarArbolRubros('3');
  }
}
