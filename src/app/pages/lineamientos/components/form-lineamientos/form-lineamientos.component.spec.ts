import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLineamientosComponent } from './form-lineamientos.component';

describe('FormLineamientosComponent', () => {
  let component: FormLineamientosComponent;
  let fixture: ComponentFixture<FormLineamientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLineamientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLineamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
