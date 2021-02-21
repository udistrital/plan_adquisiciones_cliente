import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAccionTabla, LoadFilaSeleccionada } from '../../actions/shared.actions';

@Component({
  selector: 'ngx-btn-volver',
  templateUrl: './btn-volver.component.html',
  styleUrls: ['./btn-volver.component.scss']
})
export class BtnVolverComponent implements OnInit {

  constructor(
    private location: Location,
    private store: Store<any>,
  ) { }

  ngOnInit() {
  }

  OnBack() {
    this.store.dispatch(LoadFilaSeleccionada(null));
    this.store.dispatch(LoadAccionTabla(null));
    this.location.back();
  }

}
