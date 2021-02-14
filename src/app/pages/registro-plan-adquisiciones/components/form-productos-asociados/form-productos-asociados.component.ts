import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarElementosARKA } from '../../actions/registro-plan-adquisiciones.actions';
import { getElementosARKA, getProductosAsociados } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-form-productos-asociados',
  templateUrl: './form-productos-asociados.component.html',
  styleUrls: ['./form-productos-asociados.component.scss']
})
export class FormProductosAsociadosComponent implements OnInit {

  titulo: string;
  boton: string;
  Elementos: any;
  ProductosAsociadosForm: FormGroup;
  subscription$: any;
  index: any;
  ElementosTabla: any;
  subscription2$: any;
  subscription3$: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private registroPlanService: RegistroPlanAdquisicionesService,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Asociar Producto';
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
      console.log(fila)
      this.index = null;
      if (this.sharedService.IfStore(fila)) {
        if (fila.accion.title === 'Editar Producto Asociado') {
          this.titulo = 'Editar Producto';
          this.boton = 'Editar';
          this.index = fila.index;
          this.CrearProductosAsociadosForm(fila.fila);
        }
      }
      else {
        this.titulo = 'Asociar Producto';
        this.boton = 'Asociar';
        this.CrearProductosAsociadosForm(null);
      }
    });

    this.subscription3$ = this.registroPlanService.getProductos().subscribe((productos: any) => {
      this.Elementos = productos
    })

    this.subscription2$ = this.store.select(getProductosAsociados).subscribe((elementos: any) => {
      if (this.sharedService.IfStore(elementos)) {
        this.ElementosTabla = elementos[0];
      } else {
        this.ElementosTabla = [];
      }
    });
  }

  CrearProductosAsociadosForm(data: any) {
    if (data) {
      this.ProductosAsociadosForm = this.fb.group({
        Elemento: [data.ProductoData, [Validators.required]],
        PorcentajeDistribucion: [data.PorcentajeDistribucion, [Validators.required]]
      });
    } else {
      this.ProductosAsociadosForm = this.fb.group({
        Elemento: [null, [Validators.required]],
        PorcentajeDistribucion: [null, [Validators.required]]
      });
    }
  }

  getOptionText(valor: any): string | undefined {
    return valor ? valor.Codigo : undefined;
  }

  OnSubmit() {
    if (this.index === null) {
      const elemento = this.TransformarElemento(this.ProductosAsociadosForm.value);
      this.ElementosTabla.push(elemento);
      // this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    } else {
      const elemento2 = this.TransformarElemento(this.ProductosAsociadosForm.value);
      this.ElementosTabla[this.index] = elemento2;
      // this.store.dispatch(CargarElementosARKA([this.ElementosTabla]));
    }
  }
  TransformarElemento(elemento: any) {
    return {
      Id: 0,
      Activo: true,
      ProductoAsociadoId: elemento.Elemento.id,
      PorcentajeDistribucion: elemento.PorcentajeDistribucion,
      ProductoData: elemento.Elemento
    }
  }

}
