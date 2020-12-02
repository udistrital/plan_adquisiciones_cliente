import { TestBed } from '@angular/core/testing';

import { RegistroPlanAdquisicionesService } from './registro-plan-adquisiciones.service';

describe('RegistroPlanAdquisicionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroPlanAdquisicionesService = TestBed.get(RegistroPlanAdquisicionesService);
    expect(service).toBeTruthy();
  });
});
