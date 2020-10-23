import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {

  @Input() config: any;
  @Output() selectedAction: EventEmitter<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
