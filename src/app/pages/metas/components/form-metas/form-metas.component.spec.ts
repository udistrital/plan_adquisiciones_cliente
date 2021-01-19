import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMetasComponent } from './form-metas.component';

describe('FormMetasComponent', () => {
  let component: FormMetasComponent;
  let fixture: ComponentFixture<FormMetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
