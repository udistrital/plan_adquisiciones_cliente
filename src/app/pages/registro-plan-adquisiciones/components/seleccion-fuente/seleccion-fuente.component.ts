import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { GetVigenciaActual } from '../../../../shared/actions/shared.actions';
import { getAreaFuncional, getVigenciaActual } from '../../../../shared/selectors/shared.selectors';
import { SeleccionarFuente } from '../../actions/registro-plan-adquisiciones.actions';
import { RegistroPlanAdquisicionesService } from '../../services/registro-plan-adquisiciones.service';

@Component({
  selector: 'ngx-seleccion-fuente',
  templateUrl: './seleccion-fuente.component.html',
  styleUrls: ['./seleccion-fuente.component.scss']
})
export class SeleccionFuenteComponent implements OnInit {

  FuentesFinanciamiento: any;
  FuenteForm: any;
  subscription$: any;

  constructor(
    private registroService: RegistroPlanAdquisicionesService,
    private fb: FormBuilder,
    private store: Store<any>,
  ) {
    this.store.dispatch(GetVigenciaActual({ offset: null }));
    this.FuenteForm = this.fb.group({
      fuenteSeleccionada: [null, [Validators.required]],
    });
    this.FuenteForm.get('fuenteSeleccionada').valueChanges.subscribe((value: any) => {
      this.store.dispatch(SeleccionarFuente(value));
    })
  }

  ngOnInit() {
    this.subscription$ = combineLatest([
      this.store.select(getVigenciaActual),
      this.store.select(getAreaFuncional),
    ]).subscribe(([vigencia, area]) => {
      if (vigencia && area) {
        const query = {
          Vigencia: vigencia[0].valor,
          UnidadEjecutora: area.Id,
        };
        this.registroService.getFuentesFinanciamiento(null, query).subscribe((fuente: any) => {
          this.FuentesFinanciamiento = fuente;
        });
      }
    });

  }

}
