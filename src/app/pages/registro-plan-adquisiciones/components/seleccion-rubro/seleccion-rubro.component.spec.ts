import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionRubroComponent } from './seleccion-rubro.component';

describe('SeleccionRubroComponent', () => {
  let component: SeleccionRubroComponent;
  let fixture: ComponentFixture<SeleccionRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
