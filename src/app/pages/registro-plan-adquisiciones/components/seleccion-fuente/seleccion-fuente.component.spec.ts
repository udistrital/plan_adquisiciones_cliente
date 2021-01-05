import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionFuenteComponent } from './seleccion-fuente.component';

describe('SeleccionFuenteComponent', () => {
  let component: SeleccionFuenteComponent;
  let fixture: ComponentFixture<SeleccionFuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionFuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
