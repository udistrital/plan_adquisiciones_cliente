import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadesSeleccionComponent } from './modalidades-seleccion.component';

describe('ModalidadesSeleccionComponent', () => {
  let component: ModalidadesSeleccionComponent;
  let fixture: ComponentFixture<ModalidadesSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadesSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadesSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
