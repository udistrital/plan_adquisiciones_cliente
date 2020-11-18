import { TestBed } from '@angular/core/testing';

import { MetasService } from './metas.service';

describe('MetasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetasService = TestBed.get(MetasService);
    expect(service).toBeTruthy();
  });
});
