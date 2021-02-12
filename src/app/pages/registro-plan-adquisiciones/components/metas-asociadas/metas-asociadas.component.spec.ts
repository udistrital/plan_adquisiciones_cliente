import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetasAsociadasComponent } from './metas-asociadas.component';

describe('MetasAsociadasComponent', () => {
  let component: MetasAsociadasComponent;
  let fixture: ComponentFixture<MetasAsociadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetasAsociadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetasAsociadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
