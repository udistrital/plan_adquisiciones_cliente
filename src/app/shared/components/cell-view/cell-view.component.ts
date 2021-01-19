import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadFilaSeleccionada } from '../../actions/shared.actions';

/* tslint:disable:component-selector */
@Component({
  selector: '[ngx-cell-view]',
  templateUrl: './cell-view.component.html',
  styleUrls: ['./cell-view.component.scss']
})
export class CellViewComponent implements OnInit {

  @Input() config: any;
  @Input() items: any;
  @Input() rowspanTable: any;
  @Input() index: any;

  constructor(
    private store: Store<any>,
  ) {
  }

  ngOnInit() {
  }

  SelectedAction(action: any, row: any, index: any) {

    this.store.dispatch(LoadFilaSeleccionada({
      titulo: this.config.title,
      accion: action,
      fila: row,
      index: index,
    }));
  }


}
