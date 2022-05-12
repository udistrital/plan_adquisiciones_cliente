import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { CargarElementosARKA, CargarMetasAsociadas } from '../../actions/registro-plan-adquisiciones.actions';
import { CONFIGURACION_TABLA_FICHA_ESTADISTICA } from '../../interfaces/interfaces';
import { getElementosARKA, getMetasAsociadas, getRubro } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-form-metas-asociadas',
  templateUrl: './form-metas-asociadas.component.html',
  styleUrls: ['./form-metas-asociadas.component.scss']
})
export class FormMetasAsociadasComponent implements OnInit, OnDestroy {

  Elementos: any;
  MetasAsociadasForm: FormGroup;
  subscription$: any;
  index: any;
  ElementosTabla: any;
  subscription2$: any;
  subscription3$: any;
  @ViewChild('exampleModalCloseMetas', { static: false }) contentRef: ElementRef;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private metasService: MetasService,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe(() => {
      this.CrearMetasAsociadasForm();
    });

    this.subscription2$ = combineLatest([
      this.store.select(getRubro),
      this.store.select(getMetasAsociadas),
    ]).subscribe(([data, elementos]) => {
      if (this.sharedService.IfStore(elementos)) {
        this.ElementosTabla = elementos[0];
      } else {
        this.ElementosTabla = [];
      }
      if (this.sharedService.IfStore(data)) {
        this.metasService.getMetasAsociadas(data.data.Codigo).subscribe((data2: any) => {
          if (this.sharedService.IfStore(elementos)) {
            this.Elementos = this.MontarMetasAsociadas(data2, elementos[0]);
          } else {
            this.Elementos = data2;
          }
        });
      }
    });
  }

  CrearMetasAsociadasForm() {
    this.MetasAsociadasForm = this.fb.group({
      Elemento: [null, [Validators.required]]
    });
  }

  OnSubmit() {
    const elemento = this.TransformarElemento(this.MetasAsociadasForm.value.Elemento);
    this.ElementosTabla.push(elemento);

    this.store.dispatch(CargarMetasAsociadas([this.ElementosTabla]));
  }
  TransformarElemento(elemento: any) {

    return {
      IdRegistro: elemento.Id,
      ActivoRegistro: elemento.Activo,
      ...elemento
    };
  }
  MontarMetasAsociadas(datos: any, metasAsociadas: any) {
    const metas: any = [];
    datos.forEach((element: any) => {
      if (metasAsociadas.find((data: any) => data.Id === element.Id) === undefined) {
        metas.push(element);
      }
    });
    return metas;
  }
  CloseModal() {

    Swal.fire({
      type: this.translate.instant('GLOBAL.info'),
      title: this.translate.instant('META.metas_asociadas'),
      text: this.translate.instant('ERROR.sin_metas_asociar'),
      showCancelButton: true,
    }).then((value) => {
      setTimeout(() => {
        this.renderer.selectRootElement(this.contentRef.nativeElement).click();
      }, 0);
    });
  }
}
