import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlanesService } from '../../../pages/planes/services/planes.service';
import { LoadAccionTabla } from '../../actions/shared.actions';

@Component({
  selector: 'ngx-tabla-plan-adquisiciones',
  templateUrl: './tabla-plan-adquisiciones.component.html',
  styleUrls: ['./tabla-plan-adquisiciones.component.scss']
})
export class TablaPlanAdquisicionesComponent implements OnInit {

  @Input() config: any;
  @Input() datos: any;
  @Output() selectedAction: EventEmitter<any>;
  Subtotal: any;
  stringBusqueda: string;
  datosPrueba: any[];
  rowspanTitle: number;
  rowspanTable: any[];
  keyCompound: any;
  keyObject: any;
  suma: any;

  constructor(
    private store: Store<any>,
    private planesService: PlanesService,
  ) {
    this.selectedAction = new EventEmitter<any>();
    this.rowspanTitle = 1;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.ConfiguracionTabla();
    }
  }

  ngOnInit() {
    this.ConfiguracionTabla();
    this.suma = this.planesService.SacarSumaFuente(this.datos.datos)
  }

  ConfiguracionTabla() {

    const tablespan: any = [];
    this.config.dataConfig.forEach((element: any) => {
      if (element.compound !== undefined) {
        this.rowspanTitle = 2;
        this.keyCompound = element.key;
      }
      if (element.objectKeys !== undefined) {
        this.rowspanTitle = 2;
        this.keyObject = element.key;
      }
    });
    if (this.keyCompound !== undefined) {
      this.datos.forEach((element: any) => {
        tablespan.push(element[this.keyCompound].length + 1);
      });
    }
    this.rowspanTable = tablespan;
  }

  SelectedAllAction(action: any) {
    this.store.dispatch(LoadAccionTabla({
      titulo: this.config.title,
      accion: action,
    }));
  }
}
