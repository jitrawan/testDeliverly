import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusErrorComponent } from './bus-error.component';

describe('BusErrorComponent', () => {
  let component: BusErrorComponent;
  let fixture: ComponentFixture<BusErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
