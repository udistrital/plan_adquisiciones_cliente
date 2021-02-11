import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    console.log(this.config)
    console.log(this.datos)
  }

}
