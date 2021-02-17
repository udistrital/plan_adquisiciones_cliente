import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { CargarElementosARKA, CargarMetasAsociadas } from '../../actions/registro-plan-adquisiciones.actions';
import { getElementosARKA, getMetasAsociadas, getRubro } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-form-metas-asociadas',
  templateUrl: './form-metas-asociadas.component.html',
  styleUrls: ['./form-metas-asociadas.component.scss']
})
export class FormMetasAsociadasComponent implements OnInit, OnDestroy {

  titulo: string;
  boton: string;
  Elementos: any;
  MetasAsociadasForm: FormGroup;
  subscription$: any;
  index: any;
  ElementosTabla: any;
  subscription2$: any;
  subscription3$: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    // private registroPlanService: RegistroPlanAdquisicionesService,
    private metasService: MetasService,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Asociar Meta';
    this.boton = 'Asociar';
    // this.Elementos = DATOS_PRUEBA_2;
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe(() => {
      this.titulo = 'Asociar Meta';
      this.boton = 'Asociar';
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
            this.Elementos = this.MontarMetasAsociadas(data2, elementos[0])
          } else {
            this.Elementos = data2;
          }
        });
      }
    })
  }

  CrearMetasAsociadasForm() {
    this.MetasAsociadasForm = this.fb.group({
      Elemento: [null, [Validators.required]]
    });
  }

  OnSubmit() {
    const elemento = this.TransformarElemento(this.MetasAsociadasForm.value.Elemento);
    this.ElementosTabla.push(elemento);
    console.log(this.ElementosTabla)
    this.store.dispatch(CargarMetasAsociadas([this.ElementosTabla]));
  }
  TransformarElemento(elemento: any) {
    console.log(elemento);
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
}
