import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { CargarElementosARKA } from '../../actions/registro-plan-adquisiciones.actions';
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
    // this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      this.titulo = 'Asociar Meta';
      this.boton = 'Asociar';
      this.CrearElementoARKAForm();
    });

    this.subscription3$ = this.store.select(getRubro).subscribe((data: any) => {
      if (this.sharedService.IfStore(data)) {
        this.metasService.getMetasAsociadas(data.data.Codigo).subscribe((data2: any) => {
          this.Elementos = data2;
        });
      }
    });


    this.subscription2$ = this.store.select(getMetasAsociadas).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.ElementosTabla = elementos[0];
      } else {
        this.ElementosTabla = [];
      }
    });
  }

  CrearElementoARKAForm() {
    this.MetasAsociadasForm = this.fb.group({
      Elemento: [null, [Validators.required]]
    });
  }

  OnSubmit() {
    if (this.index === null) {
      const elemento = this.TransformarElemento(this.MetasAsociadasForm.value.Elemento);
      this.ElementosTabla.push(elemento);
      // this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    } else {
      const elemento2 = this.TransformarElemento(this.MetasAsociadasForm.value.Elemento);
      this.ElementosTabla[this.index] = elemento2;
      // this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    }
  }
  TransformarElemento(elemento: any) {
    return {
      Id: 0,
      Activo: true,
      MetaId: elemento.Id
    };
  }

}
