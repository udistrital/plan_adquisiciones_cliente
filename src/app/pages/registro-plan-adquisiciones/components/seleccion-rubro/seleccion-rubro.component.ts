import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getArbolRubro, getNodoSeleccionado } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';

@Component({
  selector: 'ngx-seleccion-rubro',
  templateUrl: './seleccion-rubro.component.html',
  styleUrls: ['./seleccion-rubro.component.scss']
})
export class SeleccionRubroComponent implements OnInit {

  RubroForm: FormGroup;
  subscription$: any;
  fuentesRecurso: any;
  subscription2$: any;

  constructor(
    private fb: FormBuilder,
    private parametrics: ParametricService,
    private store: Store<any>
  ) {
    this.RubroForm = this.fb.group({
      FuenteSeleccionada: [null, [Validators.required]],
      RubroSeleccionado: [null, [Validators.required]],
    });
    this.parametrics.CargarArbolRubros('3');
  }

  ngOnInit() {

    // Cargar Fuentes de Recurso
    this.subscription$ = this.store.select(getArbolRubro).pipe(
      map(data => {
        if (Object.keys(data).length !== 0) {
          return data[0].children;
        } else {
          return null;
        }
      }),
    ).subscribe((data: any) => {
      this.fuentesRecurso = data;
    });

    // Seleccionar Rubro
    this.subscription2$ = this.store.select(getNodoSeleccionado).subscribe((nodo: any) => {
      console.log(nodo)
      if (nodo) {
        if (Object.keys(nodo)[0] === 'type') {
          // hay que crear un delay porque el cambio se efectua antes de renderizar la vista
          setTimeout(() => {
            this.RubroForm.get('RubroSeleccionado').setValue(null);
          })
        } else {
          if (!nodo.children) {
            this.RubroForm.get('RubroSeleccionado').setValue(nodo);
          }
        }
      }
    });
  }

}
