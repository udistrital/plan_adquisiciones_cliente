import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { Aplicacion } from '../../../shared/models/aplicacion';
import { Parametro } from '../../../shared/models/parametro';

@Component({
  selector: 'ngx-planes-adq-activos',
  template: '',
  styleUrls: ['./planes-adq-activos.component.scss'],
})
export class PlanesAdqActivosComponent implements OnInit {
  application_conf = environment.PLAN_ADQUISICIONES_APLICACION_NOMBRE;

  constructor(
    private confService: ConfiguracionService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.creaPlanesdeAdquisicionActivos();
  }

  private creaPlanesdeAdquisicionActivos(
    id_general = environment.IDPLANADQUISICIONES,
    id_idexud = environment.IDPLANADQUISICIONESIDEXUD
  ) {
    let QUERY = '?query=Nombre:planes_adquisiciones_activos';
    this.confService.get('parametro' + QUERY).subscribe((p: Parametro[]) => {
      if (p.length >= 0) {
        if (p[0].Id !== '' && p[0].Id !== undefined) {
          const nuevoValor = JSON.stringify({
            plan_adquisiciones_general: id_general,
            plan_adquisiciones_idexud: id_idexud,
          });

          p[0].Valor = nuevoValor;

          this.confService.put('parametro', p[0]).subscribe(() => {
            const messageOptions: any = {
              title: this.translate.instant(
                'PLAN_ADQUISICIONES.actualizacion_configuracion_titulo'
              ),
              message: this.translate.instant(
                'PLAN_ADQUISICIONES.actualizacion_configuracion'
              ),
              type: this.translate.instant('AVISOS.correcto'),
            };
            Swal.fire(messageOptions);
          });
        } else {
          QUERY = '?query=Nombre:' + this.application_conf;

          this.confService
            .get('aplicacion' + QUERY)
            .subscribe((app: Aplicacion[]) => {
              const valor = JSON.stringify({
                plan_adquisiciones_general: environment.IDPLANADQUISICIONES,
                plan_adquisiciones_idexud:
                  environment.IDPLANADQUISICIONESIDEXUD,
              });

              const nuevoParametro: Parametro = {
                Id: '29',
                Nombre: 'planes_adquisiciones_activos',
                Valor: valor,
                Aplicacion: app[0],
              };

              this.confService
                .post('parametro', nuevoParametro)
                .subscribe(() => {
                  const messageOptions: any = {
                    title: this.translate.instant(
                      'PLAN_ADQUISICIONES.creacion_configuracion_titulo'
                    ),
                    message: this.translate.instant(
                      'PLAN_ADQUISICIONES.creacion_configuracion'
                    ),
                    type: this.translate.instant('AVISOS.correcto'),
                  };
                  Swal.fire(messageOptions);
                });
            });
        }
      }
    });
  }
}
