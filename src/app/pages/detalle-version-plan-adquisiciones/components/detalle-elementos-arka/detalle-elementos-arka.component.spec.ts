import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleElementosArkaComponent } from './detalle-elementos-arka.component';

describe('DetalleElementosArkaComponent', () => {
  let component: DetalleElementosArkaComponent;
  let fixture: ComponentFixture<DetalleElementosArkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleElementosArkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleElementosArkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
