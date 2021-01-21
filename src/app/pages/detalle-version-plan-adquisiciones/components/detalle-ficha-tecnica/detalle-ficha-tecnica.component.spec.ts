import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFichaTecnicaComponent } from './detalle-ficha-tecnica.component';

describe('DetalleFichaTecnicaComponent', () => {
  let component: DetalleFichaTecnicaComponent;
  let fixture: ComponentFixture<DetalleFichaTecnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFichaTecnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
