import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusReceiveComponent } from './bus-receive.component';

describe('BusReceiveComponent', () => {
  let component: BusReceiveComponent;
  let fixture: ComponentFixture<BusReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
