import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductosAsociadasComponent } from './detalle-productos-asociadas.component';

describe('DetalleProductosAsociadasComponent', () => {
  let component: DetalleProductosAsociadasComponent;
  let fixture: ComponentFixture<DetalleProductosAsociadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProductosAsociadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductosAsociadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
