import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMetasAsociadasComponent } from './form-metas-asociadas.component';

describe('FormMetasAsociadasComponent', () => {
  let component: FormMetasAsociadasComponent;
  let fixture: ComponentFixture<FormMetasAsociadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMetasAsociadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMetasAsociadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
