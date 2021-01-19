import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLineamientosComponent } from './table-lineamientos.component';

describe('TableLineamientosComponent', () => {
  let component: TableLineamientosComponent;
  let fixture: ComponentFixture<TableLineamientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableLineamientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLineamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
