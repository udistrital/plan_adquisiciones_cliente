import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getVersionPlan } from '../../../planes/selectors/planes.selectors';

@Component({
  selector: 'ngx-detalle-rubro',
  templateUrl: './detalle-rubro.component.html',
  styleUrls: ['./detalle-rubro.component.scss']
})
export class DetalleRubroComponent implements OnInit {


  @Input() datos: any;
  fuente: any;
  subscription$: any;
  rubro: any;

  constructor(
    private store: Store<any>,
  ) {
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getVersionPlan).subscribe((version: any) => {
      const fuente_ = this.datos.RubroId.split('-')[0] + '-' + this.datos.RubroId.split('-')[1];
      this.fuente = version['registroplanadquisiciones']
        .find((x: any) => x.Fuente === fuente_);
      this.rubro = (this.fuente.datos as Array<any>)
        .find((x: any) => x.Rubro === this.datos.RubroId);
    })
  }

}
