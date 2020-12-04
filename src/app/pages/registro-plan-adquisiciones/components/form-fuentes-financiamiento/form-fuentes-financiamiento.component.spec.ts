import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFuentesFinanciamientoComponent } from './form-fuentes-financiamiento.component';

describe('FormFuentesFinanciamientoComponent', () => {
  let component: FormFuentesFinanciamientoComponent;
  let fixture: ComponentFixture<FormFuentesFinanciamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFuentesFinanciamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFuentesFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
