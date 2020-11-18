import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoadAreaFuncional, LoadCentroGestor } from '../../actions/shared.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../interfaces/interfaces';
import { getAreaFuncional, getCentroGestor } from '../../selectors/shared.selectors';

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
  subscription$: any;



  constructor(
    private store: Store<any>,
  ) {
    this.Opciones = OPCIONES_AREA_FUNCIONAL;
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getAreaFuncional),
      this.store.select(getCentroGestor)
    ]).subscribe(([area, centro]) => {
      if (area) {
        this.AreaFuncional = this.Opciones.find((opcion) => area.Id = opcion.Id);
      }
      if (centro) {
        this.CentroGestor = centro.CentroGestor;
      }
    });
  }

  SeleccionarCentroGestor(centro: any) {
    this.store.dispatch(LoadCentroGestor({ CentroGestor: centro }));
  }

  SeleccionarAreaFuncional(area: any) {
    this.store.dispatch(LoadAreaFuncional(area));
  }
}
