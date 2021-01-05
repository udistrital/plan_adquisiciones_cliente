import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundCellComponent } from './compound-cell.component';

describe('CompoundCellComponent', () => {
  let component: CompoundCellComponent;
  let fixture: ComponentFixture<CompoundCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
