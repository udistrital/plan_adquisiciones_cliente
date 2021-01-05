import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFichaTecnicaComponent } from './tabla-ficha-tecnica.component';

describe('TablaFichaTecnicaComponent', () => {
  let component: TablaFichaTecnicaComponent;
  let fixture: ComponentFixture<TablaFichaTecnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaFichaTecnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
