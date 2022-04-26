import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlanAdquisicionesComponent } from './tabla-plan-adquisiciones.component';

describe('TablaPlanAdquisicionesComponent', () => {
  let component: TablaPlanAdquisicionesComponent;
  let fixture: ComponentFixture<TablaPlanAdquisicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPlanAdquisicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlanAdquisicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
