import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAccionTabla, getArbolRubro, getAreaFuncional, getCentroGestor, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ParametricService } from '../../../../shared/services/parametric.service';
import { ConsultarLineamientos, LoadFuenteRecursoSeleccionada, SeleccionarLineamiento } from '../../actions/lineamientos.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';
import { getFuenteRecursoSeleccionada, getLineamientos } from '../../selectors/lineamientos.selectors';

@Component({
  selector: 'ngx-table-lineamientos',
  templateUrl: './table-lineamientos.component.html',
  styleUrls: ['./table-lineamientos.component.scss']
})
export class TableLineamientosComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  fuentesRecurso: any;

  subscription$: any;
  LineamientoForm: FormGroup;
  subscription2$: any;
  subscription3$: any;
  subscription4$: any;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private parametrics: ParametricService,
    private route: Router,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
    this.LineamientoForm = this.fb.group({
      FuenteSeleccionada: [null, [Validators.required]],
    });
    this.parametrics.CargarArbolRubros('3');
  }

  ngOnInit() {
    // Consultar Lineamientos Asociados
    this.subscription$ = combineLatest([
      this.store.select(getFuenteRecursoSeleccionada),
      this.store.select(getAreaFuncional),
      this.store.select(getCentroGestor)
    ]).subscribe(([fuente, area, centro]) => {
      if (fuente && area && centro) {
        this.store.dispatch(ConsultarLineamientos({
          CentroGestor: centro.CentroGestor,
          AreaFuncional: area.Nombre,
          FuenteRecurso: fuente.Codigo,
        }));
      }
    })
    // Cargar Lineamientos Asociados
    this.subscription2$ = this.store.select(getLineamientos).subscribe((lineamientos: any) => {
      if (lineamientos) {
        console.log(lineamientos);
        console.log(lineamientos[0]);
        console.log(Object.keys(lineamientos[0]));
        console.log(Object.keys(lineamientos[0]).length);
      } 
    })

    // Cargar Fuentes de Recurso
    this.subscription2$ = this.store.select(getArbolRubro).pipe(
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
    // Seleccionar lineamiento (Edicion y/o Creacion de metas)
    this.subscription3$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila) {
        this.store.dispatch(SeleccionarLineamiento(fila.fila));
        if (fila.accion.name === 'metas') {
          this.route.navigate(['pages/plan-adquisiciones/metas']);
        }
      }
    });
    // Crear Nuevo Lineamiento
    this.subscription4$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      this.store.dispatch(SeleccionarLineamiento(null));
    });

  }
  SeleccionarFuente(event: any) {
    this.store.dispatch(LoadFuenteRecursoSeleccionada(event));
  }
}
