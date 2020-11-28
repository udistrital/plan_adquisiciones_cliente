import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCodificacionArkaComponent } from './tabla-codificacion-arka.component';

describe('TablaCodificacionArkaComponent', () => {
  let component: TablaCodificacionArkaComponent;
  let fixture: ComponentFixture<TablaCodificacionArkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCodificacionArkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCodificacionArkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
