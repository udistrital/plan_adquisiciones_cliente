import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadFuncionamientoComponent } from './actividad-funcionamiento.component';

describe('ActividadFuncionamientoComponent', () => {
  let component: ActividadFuncionamientoComponent;
  let fixture: ComponentFixture<ActividadFuncionamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadFuncionamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadFuncionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
