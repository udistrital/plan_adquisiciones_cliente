import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarElementosARKA, CargarProductosAsociados } from '../../actions/registro-plan-adquisiciones.actions';
import { getElementosARKA, getProductosAsociados } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-form-productos-asociados',
  templateUrl: './form-productos-asociados.component.html',
  styleUrls: ['./form-productos-asociados.component.scss']
})
export class FormProductosAsociadosComponent implements OnInit, OnDestroy {

  titulo: string;
  boton: string;
  Elementos: any;
  ProductosAsociadosForm: FormGroup;
  subscription$: any;
  index: any;
  ElementosTabla: any;
  subscription2$: any;
  subscription3$: any;
  PorcentajeDisponible: any;
  PorcentajeTotal: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private registroPlanService: RegistroPlanAdquisicionesService,
    private sharedService: SharedService,
    private translate: TranslateService
  ) {
    this.titulo = this.translate.instant('GLOBAL.asociar') + ' ' + this.translate.instant('GLOBAL.producto');
    this.boton = this.translate.instant('GLOBAL.asociar');
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getFilaSeleccionada),
      this.store.select(getProductosAsociados),
    ]).subscribe(([fila, productos]) => {
      if (this.sharedService.IfStore(productos)) {
        this.ElementosTabla = productos[0];
      } else {
        this.ElementosTabla = [];
      }
      this.registroPlanService.getProductos().subscribe((datos: any) => {
        this.Elementos = datos;
        this.index = null;
        if (this.sharedService.IfStore(fila)) {
          if (fila.accion.title === 'Editar Producto Asociado') {
            this.titulo =  this.translate.instant('GLOBAL.editar') + ' ' + this.translate.instant('GLOBAL.producto');
            this.boton = this.translate.instant('GLOBAL.editar');
            this.index = fila.index;
            this.CalcularPorcentajeMaximo(fila.fila);
            this.CrearProductosAsociadosForm(fila.fila);
          }
        } else {
          this.titulo = this.translate.instant('GLOBAL.asociar') + ' ' + this.translate.instant('GLOBAL.producto');
          this.boton = this.translate.instant('GLOBAL.asociar');
          this.CalcularPorcentajeMaximo(null);
          this.CrearProductosAsociadosForm(null);
        }
      });
    });
  }

  CrearProductosAsociadosForm(data: any) {
    if (data) {
      this.ProductosAsociadosForm = this.fb.group({
        IdRegistro: [data.IdRegistro],
        ActivoRegistro: [data.ActivoRegistro],
        Elemento: [this.Elementos.find((x: any) => x.id === data.id), [Validators.required]],
        PorcentajeDistribucion: [data.PorcentajeDistribucion, [Validators.required, Validators.max(this.PorcentajeDisponible)]]
      });
    } else {
      this.ProductosAsociadosForm = this.fb.group({
        Elemento: [null, [Validators.required]],
        PorcentajeDistribucion: [null, [Validators.required, Validators.max(this.PorcentajeDisponible)]]
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
      this.store.dispatch(CargarProductosAsociados([this.ElementosTabla]));
    } else {
      const elemento2 = this.TransformarElemento(this.ProductosAsociadosForm.value);
      this.ElementosTabla[this.index] = elemento2;
      this.store.dispatch(CargarProductosAsociados([this.ElementosTabla]));
    }
  }
  TransformarElemento(elemento: any) {
    return {
      IdRegistro: elemento.Id,
      ActivoRegistro: elemento.Activo,
      PorcentajeDistribucion: elemento.PorcentajeDistribucion,
      PorcentajeDistribucion2: elemento.PorcentajeDistribucion / 100.0,
      ...elemento.Elemento
    };
  }

  CalcularPorcentajeMaximo( producto: any) {
    this.PorcentajeTotal = this.ElementosTabla.reduce((acc: any, value: any) => acc + value.PorcentajeDistribucion, 0);
    if (this.PorcentajeTotal < 100) {
      if (producto) {
        this.PorcentajeDisponible = 100 - this.PorcentajeTotal + producto.PorcentajeDistribucion;
      } else {
        this.PorcentajeDisponible = 100 - this.PorcentajeTotal;
      }
    }
  }

  LaunchValueNullModal() {
    Swal.fire({
      type: this.translate.instant('GLOBAL.correcto'),
      title: this.translate.instant('GLOBAL.porcentaje_distribucion') + ' ' + this.translate.instant('GLOBAL.completado'),
      text: this.translate.instant('GLOBAL.agregar_mas_productos'),
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
    });
  }
}
