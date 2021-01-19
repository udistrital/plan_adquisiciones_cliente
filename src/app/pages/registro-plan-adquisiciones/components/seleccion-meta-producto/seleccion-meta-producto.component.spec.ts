import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionMetaProductoComponent } from './seleccion-meta-producto.component';

describe('SeleccionMetaProductoComponent', () => {
  let component: SeleccionMetaProductoComponent;
  let fixture: ComponentFixture<SeleccionMetaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionMetaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionMetaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
