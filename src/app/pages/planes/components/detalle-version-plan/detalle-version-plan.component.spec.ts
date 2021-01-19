import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVersionPlanComponent } from './detalle-version-plan.component';

describe('DetalleVersionPlanComponent', () => {
  let component: DetalleVersionPlanComponent;
  let fixture: ComponentFixture<DetalleVersionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleVersionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVersionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
