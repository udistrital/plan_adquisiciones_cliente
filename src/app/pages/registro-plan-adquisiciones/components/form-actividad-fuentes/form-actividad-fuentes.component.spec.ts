import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActividadFuentesComponent } from './form-actividad-fuentes.component';

describe('FormActividadFuentesComponent', () => {
  let component: FormActividadFuentesComponent;
  let fixture: ComponentFixture<FormActividadFuentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormActividadFuentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActividadFuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
