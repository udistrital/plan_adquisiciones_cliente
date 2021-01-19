import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarElementosARKA } from '../../actions/registro-plan-adquisiciones.actions';
import { getElementosARKA } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-form-codificacion-arka',
  templateUrl: './form-codificacion-arka.component.html',
  styleUrls: ['./form-codificacion-arka.component.scss']
})
export class FormCodificacionArkaComponent implements OnInit, OnDestroy {

  titulo: string;
  boton: string;
  Elementos: any;
  ElementoARKAForm: FormGroup;
  subscription$: any;
  index: any;
  ElementosTabla: any;
  subscription2$: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private registroPlanService: RegistroPlanAdquisicionesService,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Agregar Elemento ARKA';
    this.boton = 'Crear';
    // this.Elementos = DATOS_PRUEBA_2;
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      this.index = null;
      if (this.sharedService.IfStore(fila) && fila.accion.title === 'Editar Elemento') {
        this.titulo = 'Editar Elemento ARKA';
        this.boton = 'Editar';
        this.index = fila.index;
        this.CrearElementoARKAForm(fila.fila);
      } else {
        this.titulo = 'Agregar Elemento ARKA';
        this.boton = 'Crear';
        this.CrearElementoARKAForm(null);
      }
    });

    this.subscription2$ = this.store.select(getElementosARKA).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.ElementosTabla = elementos[0];
      } else {
        this.ElementosTabla = [];
      }
    });
  }

  CrearElementoARKAForm(data: any) {
    if (data) {
      this.ElementoARKAForm = this.fb.group({
        Elemento: [data, [Validators.required]]
      });
    } else {
      this.ElementoARKAForm = this.fb.group({
        Elemento: [null, [Validators.required]]
      });
    }
    this.Elementos = this.ElementoARKAForm.get('Elemento').valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.Descripcion),
      switchMap(value => iif(() => value.length > 3, this.registroPlanService.getElementosARKA(value), of([])))
    );
  }

  getOptionText(valor: any): string | undefined {
    return valor ? valor.Descripcion : undefined;
  }

  OnSubmit() {
    if (this.index === null) {
      this.ElementosTabla.push(this.ElementoARKAForm.value.Elemento);
      this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    } else {
      this.ElementosTabla[this.index] = this.ElementoARKAForm.value.Elemento;
      this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    }
  }

}
