import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActividadesFuentesComponent } from './tabla-actividades-fuentes.component';

describe('TablaActividadesFuentesComponent', () => {
  let component: TablaActividadesFuentesComponent;
  let fixture: ComponentFixture<TablaActividadesFuentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaActividadesFuentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaActividadesFuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
