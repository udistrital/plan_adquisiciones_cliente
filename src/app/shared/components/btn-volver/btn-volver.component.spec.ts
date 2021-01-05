import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVolverComponent } from './btn-volver.component';

describe('BtnVolverComponent', () => {
  let component: BtnVolverComponent;
  let fixture: ComponentFixture<BtnVolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnVolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnVolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
