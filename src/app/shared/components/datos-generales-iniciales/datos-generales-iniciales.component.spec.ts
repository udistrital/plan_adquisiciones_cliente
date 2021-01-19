import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesInicialesComponent } from './datos-generales-iniciales.component';

describe('DatosGeneralesInicialesComponent', () => {
  let component: DatosGeneralesInicialesComponent;
  let fixture: ComponentFixture<DatosGeneralesInicialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosGeneralesInicialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesInicialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
