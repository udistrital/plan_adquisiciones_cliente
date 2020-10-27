import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMetasComponent } from './table-metas.component';

describe('TableMetasComponent', () => {
  let component: TableMetasComponent;
  let fixture: ComponentFixture<TableMetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
