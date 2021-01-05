import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlanesAdquisicionesComponent } from './tabla-planes-adquisiciones.component';

describe('TablaPlanesAdquisicionesComponent', () => {
  let component: TablaPlanesAdquisicionesComponent;
  let fixture: ComponentFixture<TablaPlanesAdquisicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPlanesAdquisicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlanesAdquisicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
