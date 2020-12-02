import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCodificacionArkaComponent } from './form-codificacion-arka.component';

describe('FormCodificacionArkaComponent', () => {
  let component: FormCodificacionArkaComponent;
  let fixture: ComponentFixture<FormCodificacionArkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCodificacionArkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCodificacionArkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
