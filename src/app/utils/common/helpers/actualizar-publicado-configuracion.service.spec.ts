import { TestBed } from '@angular/core/testing';

import { ActualizarPublicadoConfiguracionService } from './actualizar-publicado-configuracion.service';

describe('ActualizarPublicadoConfiguracionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualizarPublicadoConfiguracionService = TestBed.get(ActualizarPublicadoConfiguracionService);
    expect(service).toBeTruthy();
  });
});
