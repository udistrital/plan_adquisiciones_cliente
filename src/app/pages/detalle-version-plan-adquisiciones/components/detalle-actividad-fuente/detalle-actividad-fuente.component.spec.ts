import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActividadFuenteComponent } from './detalle-actividad-fuente.component';

describe('DetalleActividadFuenteComponent', () => {
  let component: DetalleActividadFuenteComponent;
  let fixture: ComponentFixture<DetalleActividadFuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleActividadFuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleActividadFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
