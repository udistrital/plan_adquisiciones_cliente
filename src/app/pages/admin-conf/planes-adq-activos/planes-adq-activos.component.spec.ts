import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesAdqActivosComponent } from './planes-adq-activos.component';

describe('PlanesAdqActivosComponent', () => {
  let component: PlanesAdqActivosComponent;
  let fixture: ComponentFixture<PlanesAdqActivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesAdqActivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesAdqActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
