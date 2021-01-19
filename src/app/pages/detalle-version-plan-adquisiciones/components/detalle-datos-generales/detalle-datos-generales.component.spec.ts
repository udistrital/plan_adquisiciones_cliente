import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDatosGeneralesComponent } from './detalle-datos-generales.component';

describe('DetalleDatosGeneralesComponent', () => {
  let component: DetalleDatosGeneralesComponent;
  let fixture: ComponentFixture<DetalleDatosGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleDatosGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
