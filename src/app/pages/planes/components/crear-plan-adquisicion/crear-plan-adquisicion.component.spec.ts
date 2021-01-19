import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanAdquisicionComponent } from './crear-plan-adquisicion.component';

describe('CrearPlanAdquisicionComponent', () => {
  let component: CrearPlanAdquisicionComponent;
  let fixture: ComponentFixture<CrearPlanAdquisicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPlanAdquisicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPlanAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
