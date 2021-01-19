import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { SharedService } from '../../../../shared/services/shared.service';
import { MetasService } from '../../../metas/services/metas.service';
import { CargarMeta, CargarProducto } from '../../actions/registro-plan-adquisiciones.actions';
import { getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-meta-producto',
  templateUrl: './seleccion-meta-producto.component.html',
  styleUrls: ['./seleccion-meta-producto.component.scss']
})
export class SeleccionMetaProductoComponent implements OnInit, OnDestroy {

  MetaForm: FormGroup;
  Productos: any;
  Metas: any;
  subscription$: any;
  subscription2$: any;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private metaService: MetasService,
    private fb: FormBuilder,
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  ngOnInit() {

    this.subscription$ = this.store.select(getRenglonSeleccionado).subscribe((renglon: any) => {
      this.registroService.getProductos().subscribe((productos: any) => {
        if (this.sharedService.IfStore(renglon) && productos) {
          this.metaService.getMetasRubro(renglon[0].RubroId).subscribe((metas) => {
            this.Productos = productos;
            this.Metas = metas;
            this.CrearFormulario(renglon);
          });
        } else {
          this.Productos = productos;
          this.CrearFormulario();
        }
      });

    });
    this.subscription2$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (this.sharedService.IfStore(nodo)) {
        if (nodo.data && !nodo.children && this.MetaForm !== undefined) {
          this.metaService.getMetasRubro(nodo.data.Codigo).subscribe((data) => {
            this.MetaForm.get('MetaSeleccionada').setValue(null);
            if (Object.keys(data[0]).length !== 0) {
              this.Metas = data;
            } else {
              this.Metas = undefined;
            }
          });
        }
      }
    });
  }

  CrearFormulario(renglon?: any) {

    if (renglon) {
      const meta = this.Metas.find((x: any) => x.Id === parseFloat(renglon[0].MetaId));
      const producto = this.Productos.find((x: any) => x._id === renglon[0].ProductoId);

      this.MetaForm = this.fb.group({
        MetaSeleccionada: [meta, [Validators.required]],
        ProductoSeleccionado: [producto, [Validators.required]],
      });
      this.store.dispatch(CargarMeta(meta));
      this.store.dispatch(CargarProducto(producto));
    } else {
      this.MetaForm = this.fb.group({
        MetaSeleccionada: [null, [Validators.required]],
        ProductoSeleccionado: [null, [Validators.required]],
      });
    }
    this.MetaForm.get('MetaSeleccionada').valueChanges.subscribe((data: any) => {
      this.store.dispatch(CargarMeta(data));
    });
    this.MetaForm.get('ProductoSeleccionado').valueChanges.subscribe((data: any) => {
      this.store.dispatch(CargarProducto(data));
    });
  }
}
