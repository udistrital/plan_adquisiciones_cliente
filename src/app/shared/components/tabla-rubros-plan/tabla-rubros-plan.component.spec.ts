import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRubrosPlanComponent } from './tabla-rubros-plan.component';

describe('TablaRubrosPlanComponent', () => {
  let component: TablaRubrosPlanComponent;
  let fixture: ComponentFixture<TablaRubrosPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRubrosPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRubrosPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
