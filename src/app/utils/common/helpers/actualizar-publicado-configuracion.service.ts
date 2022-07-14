import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { Parametro } from '../../../shared/models/parametro';
import { Aplicacion } from '../../../shared/models/aplicacion';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { PopUpManager } from '../../../@core/managers/popUpManager';

const IDPLANGENERAL = environment.IDPLANADQUISICIONES;
const IDPLANIDEXUD = environment.IDPLANADQUISICIONESIDEXUD;

@Injectable({
  providedIn: 'root',
})
export class ActualizarPublicadoConfiguracionService {
  application_conf = environment.PLAN_ADQUISICIONES_APLICACION_NOMBRE;

  constructor(
    private confService: ConfiguracionService,
    private translate: TranslateService,
    private popupService: PopUpManager
  ) {}

  public creaPlanesdeAdquisicionActivos(
    id_general = IDPLANGENERAL,
    id_idexud = IDPLANIDEXUD
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

          this.confService.put('parametro', p[0]).subscribe((res) => {
            const messageOptions: any = {
              tittle: this.translate.instant(
                'PLAN_ADQUISICIONES.publicado'
              ),
              text: this.translate.instant(
                'PLAN_ADQUISICIONES.actualizacion_configuracion'
              ),
            };
            this.popupService.showSuccessAlert(messageOptions.text, messageOptions.tittle);
          });
        } else {
          QUERY = '?query=Nombre:' + this.application_conf;

          this.confService
            .get('aplicacion' + QUERY)
            .subscribe((app: Aplicacion[]) => {
              const valor = JSON.stringify({
                plan_adquisiciones_general: IDPLANGENERAL,
                plan_adquisiciones_idexud: IDPLANIDEXUD,
              });

              const nuevoParametro: Parametro = {
                Id: '29',
                Nombre: 'planes_adquisiciones_activos',
                Valor: valor,
                Aplicacion: app[0],
              };

              this.confService
                .post('parametro', nuevoParametro)
                .subscribe((res) => {
                  const messageOptions: any = {
                    tittle: this.translate.instant(
                      'PLAN_ADQUISICIONES.publicado'
                    ),
                    text: this.translate.instant(
                      'PLAN_ADQUISICIONES.creacion_configuracion'
                    ),
                  };
                  this.popupService.showSuccessAlert(messageOptions.text, messageOptions.tittle);
                });
            });
        }
      }
    });
  }
}
