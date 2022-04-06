import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, forkJoin } from 'rxjs';
import { PopUpManager } from '../../../../@core/managers/popUpManager';
import { GetVigenciaActual } from '../../../../shared/actions/shared.actions';
import {
  getAreaFuncional,
  getVigenciaActual,
} from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import {
  CargarActividadFuente,
  CargarProducto,
  SeleccionarFuente,
} from '../../actions/registro-plan-adquisiciones.actions';
import {
  getActividadFuente,
  getRenglonSeleccionado,
  getRubro,
} from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';


@Component({
  selector: 'ngx-seleccion-fuente',
  templateUrl: './seleccion-fuente.component.html',
  styleUrls: ['./seleccion-fuente.component.scss'],
})
export class SeleccionFuenteComponent implements OnInit, OnDestroy {
  FuentesFinanciamiento: any;
  FuenteForm: any;
  subscription$: any;
  Actividades: any;
  subscription2$: any;
  subscription3$: any;
  disableFuentes: boolean;
  actividadesCargadas: boolean;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private fb: FormBuilder,
    private store: Store<any>,
    private sharedService: SharedService,
    private actividadesService: ActividadesService,
    private pUpManager: PopUpManager,
    private translate: TranslateService
  ) {
    this.store.dispatch(GetVigenciaActual({ offset: null }));
    this.Actividades = [];
    this.disableFuentes = true;
    this.actividadesCargadas = false;
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    // this.subscription2$.unsubscribe();
    // this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getVigenciaActual),
      this.store.select(getAreaFuncional),
      this.store.select(getRenglonSeleccionado),
      this.store.select(getRubro),
    ]).subscribe(([vigencia, area, renglon, rubro]) => {
      if (
        this.sharedService.IfStore(vigencia) &&
        this.sharedService.IfStore(area) &&
        this.sharedService.IfStore(rubro)
      ) {
        const query = {
          Vigencia: vigencia[0].valor,
          UnidadEjecutora: area.Id,
        };
        this.actividadesCargadas = false;
        forkJoin({
          fuente: this.registroService.getFuentesFinanciamiento(null, query),
          actividades: this.actividadesService.getActividadesPorRubro(
            rubro.data.Codigo
          ),
        }).subscribe(({ fuente, actividades }) => {
          this.FuentesFinanciamiento = fuente;
          this.Actividades = actividades;
          if (this.sharedService.IfStore(renglon)) {
            if (renglon[0]['FuenteFinanciamientoId'] !== '') {
              this.CrearFuenteForm(renglon[0]);
            } else {
              this.CrearFuenteForm(null);
            }
          } else {
            this.CrearFuenteForm(null);
          }

          this.actividadesCargadas = true;
        });
      }
    });
  }

  CrearFuenteForm(data: any) {
    if (data) {
      this.FuenteForm = this.fb.group({
        Actividad: [
          this.Actividades.find((x: any) => x.Id === data.ActividadId),
          [Validators.required],
        ],
        Valor: [data.ValorActividad, [Validators.required]],
        FuenteFinanciamiento: [
          this.FuentesFinanciamiento.find(
            (x: any) => x.Codigo === data.FuenteFinanciamientoId
          ),
          [Validators.required],
        ],
      });
      this.FuenteForm.valueChanges.subscribe((value: any) => {
        this.store.dispatch(CargarActividadFuente(value));
      });
    } else {
      this.FuenteForm = this.fb.group({
        Actividad: [null, [Validators.required]],
        Valor: [0, [Validators.required]],
        FuenteFinanciamiento: [null, [Validators.required]],
      });
      this.FuenteForm.valueChanges.subscribe((value: any) => {
        this.store.dispatch(CargarActividadFuente(value));
      });
      this.FuenteForm.get('FuenteFinanciamiento').valueChanges.subscribe(
        (value: any) => {
          this.store.dispatch(CargarProducto(value));
        }
      );
    }
  }

  selectFuentes(event) {
    this.disableFuentes = false;
  }

  showAlertActividadesFirst() {
    if (this.disableFuentes === true) {
      this.pUpManager.showErrorAlert(
        this.translate.instant(
          `Recuerde seleccionar una actividad en la lista desplegable`
        )
      );
    }
  }
}
