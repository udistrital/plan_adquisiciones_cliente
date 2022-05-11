import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { CONFIGURACION_TABLA_FUENTES } from '../../interfaces/interfaces';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ActividadesService } from '../../../actividades/services/actividades.service';
import { getActividades, getActividadSeleccionada, getFuentes, getMeta, getMetasAsociadas } from '../../selectors/registro-plan-adquisiciones.selectors';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormFuentesFinanciamientoComponent } from '../form-fuentes-financiamiento/form-fuentes-financiamiento.component';
import { CargarActividades, CargarFuentes, SeleccionarFuente } from '../../actions/registro-plan-adquisiciones.actions';
import { combineLatest, forkJoin, from, of } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';
import { mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { TranslateFormItemsHelper } from '../../../../shared/helpers/translateFormItems';

@Component({
  selector: 'ngx-form-actividad-fuentes',
  templateUrl: './form-actividad-fuentes.component.html',
  styleUrls: ['./form-actividad-fuentes.component.scss']
})
export class FormActividadFuentesComponent implements OnInit, OnDestroy {

  titulo: string;
  boton: string;
  Actividades: any;
  ActividadFuentesForm: FormGroup;
  subscription$: any;
  configuracion: any;
  Datos: any;
  subscription2$: any;
  subscription3$: any;
  display: boolean;
  subscription4$: any;
  ActividadesAsociadas: any;
  ActividadesCapturadas: any[];



  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private actividadesService: ActividadesService,
    private matDialogRef: MatDialogRef<FormActividadFuentesComponent>,
    private matDialog: MatDialog,
    private sharedService: SharedService,
    private translate: TranslateService,
    private translateHelper: TranslateFormItemsHelper
  ) {
    this.titulo = this.translate.instant('GLOBAL.agregar') + this.translate.instant('GLOBAL.actividad');
    this.boton = this.translate.instant('GLOBAL.crear');
    // this.Datos = DATOS_PRUEBA_4;
    this.ActividadesAsociadas = [];
    this.ActividadesCapturadas = [];
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
    this.subscription4$.unsubscribe();
  }

  ngOnInit() {
    this.translateTableConfiguracion();
    // Traer Actividades y montar Actividad Seleccionada
    this.subscription$ = combineLatest([
      this.store.select(getMetasAsociadas),
      this.store.select(getActividadSeleccionada),
      this.store.select(getActividades),
    ]).subscribe(([metas, actividad, actividades]) => {
      if (this.sharedService.IfStore(metas)) {
        const datos = of(...metas[0]);
        datos.pipe(
          mergeMap(
            (value: any) => {
              return this.actividadesService.getActividadesAsociadas(value.Id);
            }
          )
        ).subscribe((actividades2: any) => {
          if (Object.keys(actividades2[0]).length !== 0) {
            this.ActividadesCapturadas = [...this.ActividadesCapturadas, ...actividades2];
          }
        }, () => { }, () => {
          if (this.sharedService.IfStore(actividad)) {
            this.Actividades = this.ActividadesCapturadas;
            this.CrearActividadFuentesForm(actividad);
            this.titulo = this.translate.instant('GLOBAL.editar') + this.translate.instant('GLOBAL.actividad');
            this.boton = this.translate.instant('GLOBAL.editar');
          } else {
            if (this.sharedService.IfStore(actividades)) {
              this.ActividadesAsociadas = actividades[0];
              this.Actividades = this.MontarActividades(this.ActividadesCapturadas, actividades[0]);
              if (Object.keys(this.Actividades).length === 0) {
                this.ActividadesAsociadasModal();
              }
            } else {
              this.Actividades = this.ActividadesCapturadas;
            }
            this.CrearActividadFuentesForm(null);
            this.titulo = this.translate.instant('GLOBAL.agregar') + this.translate.instant('GLOBAL.actividad');
            this.boton = this.translate.instant('GLOBAL.crear');
          }
        });
      }
    });
    // Seleccionar Elemento
    this.subscription2$ = this.store.select(getAccionTabla).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Agregar Fuente de Financiamiento') {
          this.store.dispatch(SeleccionarFuente(null));
          this.OpenModal();
        }
      }
    });
    // Nuevo Elemento
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (this.sharedService.IfStore(accion)) {
        if (accion.accion.title === 'Eliminar Fuente de Financiamiento') {
          this.LaunchDeleteModal(accion.index);
        }
        if (accion.accion.title === 'Editar Fuente de Financiamiento') {
          this.store.dispatch(SeleccionarFuente(accion.fila));
          this.OpenModal();
        }
      }
    });
    this.subscription4$ = this.store.select(getFuentes).subscribe((fuentes: any) => {
      if (this.sharedService.IfStore(fuentes)) {
        this.Datos = fuentes[0];
      } else {
        this.Datos = [];
      }
    });
  }
  CrearActividadFuentesForm(data: any) {
    if (data) {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [{
          disabled: true,
          value: this.Actividades.find((element: any) => element.Id === data.ActividadId.Id),
        }, [Validators.required]],
        Valor: [{ value: data.Valor, disabled: false}, [Validators.required]],
      });
    } else {
      this.ActividadFuentesForm = this.fb.group({
        Actividad: [null, []],
        Valor: [null, []],
      });
    }
  }

  private translateTableConfiguracion(): void {
    this.configuracion = CONFIGURACION_TABLA_FUENTES;
    this.configuracion = this.translateHelper.translateItemTableConfiguration(this.configuracion);
  }

  OpenModal() {
    if (this.ActividadFuentesForm) {
      if (this.ActividadFuentesForm.value.Valor) {
        this.matDialog.open(FormFuentesFinanciamientoComponent, {
          data: this.ActividadFuentesForm.value,
        });
      } else {
        Swal.fire({
          type: this.translate.instant('GLOBAL.error'),
          title: this.translate.instant('ERROR.sin_datos'),
          text: this.translate.instant('ACTIVIDAD.valor_actividad_error'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      }
    }
  }
  ActividadesAsociadasModal() {
    Swal.fire({
      type: this.translate.instant('AVISOS.info'),
      title: this.translate.instant('ACTIVIDAD.actividades_asociadas'),
      text: this.translate.instant('ACTIVIDAD.todas_actividades_asociadas'),
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
    }).then(() => {
      this.OnClose();
    });
  }

  OnClose() {
    this.matDialogRef.close();
  }
  LaunchDeleteModal(index: any) {
    Swal.fire({
      type: this.translate.instant('GLOBAL.error'),
      title: this.translate.instant('ERROR.titulo_confirmacion_eliminar'),
      text: this.translate.instant('ERROR.confirmacion_eliminar'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    }).then((value) => {
      if (value.value) {

        this.Datos.splice(index, 1);
        this.store.dispatch(CargarFuentes([this.Datos]));
      }
    });
  }
  OnSubmit() {
    let Creacion = true;
    const Actividad = this.ActividadFuentesForm.getRawValue();
    Actividad.Actividad.Id2 = Actividad.Actividad.Numero + '.' +
    Actividad.Actividad.MetaId.Numero;
    Actividad.Actividad.Valor = Actividad.Valor;
    this.ActividadesAsociadas.forEach((element: any) => {
      if (Actividad.Actividad.Id === element.ActividadId.Id) {
        element.ActividadId.Valor = Actividad.Valor;
        element.Valor = Actividad.Valor;
        element.FuentesFinanciamiento = this.Datos;
        Creacion = false;
      }
    });
    if (Creacion) {
      this.ActividadesAsociadas.push({
        ActividadId: Actividad.Actividad,
        Valor: Actividad.Valor,
        FuentesFinanciamiento: this.Datos,
      });
    }

    this.store.dispatch(CargarActividades([this.ActividadesAsociadas]));
    this.OnClose();
  }
  MontarActividades(datos: any, actividadesAsociadas: any) {
    const actividad: any = [];
    datos.forEach((element: any) => {
      if (actividadesAsociadas.find((data: any) => data.ActividadId.Id === element.Id) === undefined) {
        actividad.push(element);
      }
    });
    return actividad;
  }
}
