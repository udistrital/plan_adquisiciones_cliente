import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaVersionesComponent } from './tabla-versiones.component';

describe('TablaVersionesComponent', () => {
  let component: TablaVersionesComponent;
  let fixture: ComponentFixture<TablaVersionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaVersionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaVersionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
