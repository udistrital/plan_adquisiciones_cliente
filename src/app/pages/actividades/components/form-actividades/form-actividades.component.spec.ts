import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActividadesComponent } from './form-actividades.component';

describe('FormActividadesComponent', () => {
  let component: FormActividadesComponent;
  let fixture: ComponentFixture<FormActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
