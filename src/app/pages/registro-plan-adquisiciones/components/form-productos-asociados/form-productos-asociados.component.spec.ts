import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductosAsociadosComponent } from './form-productos-asociados.component';

describe('FormProductosAsociadosComponent', () => {
  let component: FormProductosAsociadosComponent;
  let fixture: ComponentFixture<FormProductosAsociadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductosAsociadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductosAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
