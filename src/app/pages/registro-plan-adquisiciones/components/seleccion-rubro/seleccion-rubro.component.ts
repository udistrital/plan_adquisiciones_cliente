import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadNodoSeleccionado } from '../../../../shared/actions/shared.actions';
import { getArbolRubro, getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { CargarRubro } from '../../actions/registro-plan-adquisiciones.actions';
import { getRenglonSeleccionado } from '../../selectors/registro-plan-adquisiciones.selectors';

@Component({
  selector: 'ngx-seleccion-rubro',
  templateUrl: './seleccion-rubro.component.html',
  styleUrls: ['./seleccion-rubro.component.scss']
})
export class SeleccionRubroComponent implements OnInit, OnDestroy {

  RubroForm: FormGroup;
  subscription$: any;
  fuentesRecurso: any;
  subscription2$: any;

  constructor(
    private fb: FormBuilder,
    private parametrics: ParametricService,
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    // this.parametrics.CargarArbolRubros('3');
    this.RubroForm = this.fb.group({
      FuenteSeleccionada: [null, [Validators.required]],
      RubroSeleccionado: [null, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription2$.unsubscribe();
  }

  ngOnInit() {

    this.subscription$ = combineLatest([
      this.store.select(getRenglonSeleccionado),
      this.store.select(getArbolRubro),
    ]).subscribe(([renglon, data]) => {

      if (this.sharedService.IfStore(data) && Object.keys(data).length !== 0) {
        if (this.sharedService.IfStore(renglon)) {
          this.CrearFormularioRubro(data, renglon[0].RubroId);
        } else {
          this.CrearFormularioRubro(data);
        }
      }
    });
    // Seleccionar Rubro
    this.subscription2$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      if (this.sharedService.IfStore(nodo)) {
        if (!nodo.children) {
          setTimeout(() => {
            this.RubroForm.get('RubroSeleccionado').setValue(nodo);
          });
        } else {
          setTimeout(() => {
            this.RubroForm.get('RubroSeleccionado').setValue(null);
          });
        }
      }
    });
  }

  CrearFormularioRubro(arbol: any, rubroId?: string) {

    this.fuentesRecurso = arbol[0].children;

    if (rubroId) {

      const info = rubroId.split('-');
      const rubro = this.sharedService.BuscarNodo(arbol[0].children, rubroId);

      this.store.dispatch(CargarRubro(rubro));
      this.RubroForm = this.fb.group({
        FuenteSeleccionada: [
          this.fuentesRecurso.find((x: any) => x.Codigo === `${info[0]}-${info[1]}`),
          [Validators.required]],
        RubroSeleccionado: [
          rubro,
          [Validators.required]],
      });
    } else {
      this.RubroForm = this.fb.group({
        FuenteSeleccionada: [null, [Validators.required]],
        RubroSeleccionado: [null, [Validators.required]],
      });
    }
    this.RubroForm.get('RubroSeleccionado').valueChanges.subscribe((data: any) => {
      this.store.dispatch(CargarRubro(data));
    });
  }
}
