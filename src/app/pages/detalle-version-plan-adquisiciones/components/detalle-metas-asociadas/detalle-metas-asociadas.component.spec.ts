import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMetasAsociadasComponent } from './detalle-metas-asociadas.component';

describe('DetalleMetasAsociadasComponent', () => {
  let component: DetalleMetasAsociadasComponent;
  let fixture: ComponentFixture<DetalleMetasAsociadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMetasAsociadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMetasAsociadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
