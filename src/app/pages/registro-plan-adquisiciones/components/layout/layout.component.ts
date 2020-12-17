import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  titulo: any;
  TipoDePlan: any;
  Guardar: boolean;
  Registro: any;

  constructor(
    private store: Store<any>,
    private sharedService: SharedService,
  ) {
    this.titulo = 'Creacion Plan de Adquisiciones';
    this.TipoDePlan = true;
    this.Guardar = false;
  }

  ngOnInit() {
    this.store.select('registroPlanAdquisiciones').subscribe((data: any) => {
      if (
        this.sharedService.IfStore(data.Rubro) &&
        this.sharedService.IfStore(data.Meta) &&
        this.sharedService.IfStore(data.Producto) &&
        this.sharedService.IfStore(data.Modalidades) &&
        this.sharedService.IfStore(data.ElementosARKA) &&
        this.sharedService.IfStore(data.Actividades)
      ) {
        this.Registro = data;
        this.Guardar = true;
      } else {
        this.Guardar = false;
      }
    })
  }

  OnSubmit() {
    console.log(this.Registro);
  }
}
