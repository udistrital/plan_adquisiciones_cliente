import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAreaFuncional, LoadCentroGestor } from '../../../../shared/actions/shared.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { SharedService } from '../../../../shared/services/shared.service';
import { getRenglonVersion, getVersionPlan } from '../../../planes/selectors/planes.selectors';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  Info: any;
  Version: any;
  titulo: string;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Detalle Plan de Adquisiciones';
  }

  ngOnInit() {
    this.store.select(getRenglonVersion).subscribe((renglon: any) => {
      if (this.sharedService.IfStore(renglon)) {
        this.Info = renglon;
        this.store.dispatch(LoadCentroGestor({ CentroGestor: renglon.centrogestor }));
      }
    });
    this.store.select(getVersionPlan).subscribe((plan: any) => {
      if (this.sharedService.IfStore(plan)) {
        this.Version = plan;
      }
    });
    this.sharedService.RetornarAlInicio('planes', 'pages/plan-adquisiciones/planes/tabla-general');
  }

}
