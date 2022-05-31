import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { Aplicacion } from '../../../shared/models/aplicacion';
import { Parametro } from '../../../shared/models/parametro';
import { ActualizarPublicadoConfiguracionService } from '../../../utils/common/helpers/actualizar-publicado-configuracion.service';

@Component({
  selector: 'ngx-planes-adq-activos',
  template: '',
  styleUrls: ['./planes-adq-activos.component.scss'],
})
export class PlanesAdqActivosComponent implements OnInit {
  application_conf = environment.PLAN_ADQUISICIONES_APLICACION_NOMBRE;

  constructor(
    private actualizarPlanesService: ActualizarPublicadoConfiguracionService
  ) {}

  ngOnInit() {
    this.actualizarPlanesService.creaPlanesdeAdquisicionActivos();
  }
}
