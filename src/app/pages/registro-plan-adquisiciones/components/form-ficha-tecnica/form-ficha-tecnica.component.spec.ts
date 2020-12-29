import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFichaTecnicaComponent } from './form-ficha-tecnica.component';

describe('FormFichaTecnicaComponent', () => {
  let component: FormFichaTecnicaComponent;
  let fixture: ComponentFixture<FormFichaTecnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFichaTecnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
