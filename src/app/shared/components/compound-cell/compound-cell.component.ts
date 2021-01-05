import { Component, Input, OnInit } from '@angular/core';

/* tslint:disable:component-selector */
@Component({
  selector: '[ngx-compound-cell]',
  templateUrl: './compound-cell.component.html',
  styleUrls: ['./compound-cell.component.scss']
})
export class CompoundCellComponent implements OnInit {

  @Input() dataConfig: any;
  @Input() items: any;

  constructor() { }

  ngOnInit() {
  }

}
