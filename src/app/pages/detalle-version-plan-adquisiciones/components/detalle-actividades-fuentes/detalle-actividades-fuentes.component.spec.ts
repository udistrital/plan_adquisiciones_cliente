import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActividadesFuentesComponent } from './detalle-actividades-fuentes.component';

describe('DetalleActividadesFuentesComponent', () => {
  let component: DetalleActividadesFuentesComponent;
  let fixture: ComponentFixture<DetalleActividadesFuentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleActividadesFuentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleActividadesFuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
