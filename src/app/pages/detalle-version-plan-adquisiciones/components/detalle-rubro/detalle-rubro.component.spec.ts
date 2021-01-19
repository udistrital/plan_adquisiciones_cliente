import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRubroComponent } from './detalle-rubro.component';

describe('DetalleRubroComponent', () => {
  let component: DetalleRubroComponent;
  let fixture: ComponentFixture<DetalleRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
