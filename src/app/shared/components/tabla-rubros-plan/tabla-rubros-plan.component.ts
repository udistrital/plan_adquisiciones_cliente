import { Component, Input, OnInit } from '@angular/core';
import { PlanesService } from '../../../pages/planes/services/planes.service';

/* tslint:disable:component-selector */
@Component({
  selector: '[ngx-tabla-rubros-plan]',
  templateUrl: './tabla-rubros-plan.component.html',
  styleUrls: ['./tabla-rubros-plan.component.scss']
})
export class TablaRubrosPlanComponent implements OnInit {

  @Input() config: any;
  @Input() datos: any;
  @Input() rowspanTable: any;
  @Input() index: any;
  suma: any;

  constructor(
    private planesService: PlanesService,
  ) { }

  ngOnInit() {
    this.datos.datos = this.planesService.AjustarDatosPlan(this.datos.datos);
    this.suma = this.planesService.SacarSumaRubro(this.datos.datos);
  }

}
