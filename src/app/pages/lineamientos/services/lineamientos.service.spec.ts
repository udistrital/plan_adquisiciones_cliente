import { TestBed } from '@angular/core/testing';

import { LineamientosService } from './lineamientos.service';

describe('LineamientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineamientosService = TestBed.get(LineamientosService);
    expect(service).toBeTruthy();
  });
});
