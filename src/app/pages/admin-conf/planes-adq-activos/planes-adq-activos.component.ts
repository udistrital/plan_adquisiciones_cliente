import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { Aplicacion } from '../../../shared/models/aplicacion';
import { Parametro } from '../../../shared/models/parametro';

@Component({
  selector: 'ngx-planes-adq-activos',
  templateUrl: './planes-adq-activos.component.html',
  styleUrls: ['./planes-adq-activos.component.scss'],
})
export class PlanesAdqActivosComponent implements OnInit {
  application_conf = environment.PLAN_ADQUISICIONES_APLICACION_NOMBRE;

  constructor(private confService: ConfiguracionService) {}

  ngOnInit() {
    this.creaPlanesdeAdquisicionActivos();
  }
  // FIXME: Ingresar parámetros desde la interfaz de administrabilidad
  private creaPlanesdeAdquisicionActivos(id_general = '613bbde12b95b39aff6a542a', id_idexud = '613ac16a2b95b39aff6a5429') {
    let QUERY = '?query=Nombre:planes_adquisiciones_activos';
    this.confService.get('parametro' + QUERY).subscribe((p: Parametro[]) => {
      if (p.length >= 0) {
        if (p[0].Id !== "" && p[0].Id !== undefined) {
          // FIXME: Hacer el Put
          const nuevoValor = JSON.stringify({
            plan_adquisiciones_general: id_general,
            plan_adquisiciones_idexud: id_idexud,
          });

          p[0].Valor = nuevoValor;

          this.confService.put('parametro', p[0]).subscribe(res => {
            console.log("Hice el PUT");
          });
        } else {
          QUERY = '?query=Nombre:' + this.application_conf;

          this.confService
            .get('aplicacion' + QUERY)
            .subscribe((app: Aplicacion[]) => {
              const valor = JSON.stringify({
                plan_adquisiciones_general: '613bbde12b95b39aff6a542a',
                plan_adquisiciones_idexud: '613ac16a2b95b39aff6a5429',
              });

              const nuevoParametro: Parametro = {
                Id: 29,
                Nombre: 'planes_adquisiciones_activos',
                Valor: valor,
                Aplicacion: app[0],
              };

              this.confService.post('parametro', nuevoParametro).subscribe(res => {
                // console.log('HICE EL POST');
              });
            });
        }
      }
    });
  }
}
