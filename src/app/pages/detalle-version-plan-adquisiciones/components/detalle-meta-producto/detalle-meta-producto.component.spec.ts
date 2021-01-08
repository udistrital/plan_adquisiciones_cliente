import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMetaProductoComponent } from './detalle-meta-producto.component';

describe('DetalleMetaProductoComponent', () => {
  let component: DetalleMetaProductoComponent;
  let fixture: ComponentFixture<DetalleMetaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMetaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMetaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
