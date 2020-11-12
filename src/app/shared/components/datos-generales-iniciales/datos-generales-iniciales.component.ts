import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAreaFuncional, LoadCentroGestor } from '../../actions/shared.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-datos-generales-iniciales',
  templateUrl: './datos-generales-iniciales.component.html',
  styleUrls: ['./datos-generales-iniciales.component.scss']
})
export class DatosGeneralesInicialesComponent implements OnInit {

  @Input() Title: any;
  @Input() Disabled: boolean;

  AreaFuncional: any;
  CentroGestor: any;
  Opciones: any[];



  constructor(
    private store: Store<any>,
  ) {
    this.Opciones = OPCIONES_AREA_FUNCIONAL;
  }

  ngOnInit() {
  }

  SeleccionarCentroGestor() {
    this.store.dispatch(LoadCentroGestor({ CentroGestor: this.CentroGestor }));
  }

  SeleccionarAreaFuncional(area: any) {
    this.store.dispatch(LoadAreaFuncional(area));
  }
}
