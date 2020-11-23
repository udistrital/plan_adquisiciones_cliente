import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDatosGeneralesComponent } from './seleccion-datos-generales.component';

describe('SeleccionDatosGeneralesComponent', () => {
  let component: SeleccionDatosGeneralesComponent;
  let fixture: ComponentFixture<SeleccionDatosGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionDatosGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
