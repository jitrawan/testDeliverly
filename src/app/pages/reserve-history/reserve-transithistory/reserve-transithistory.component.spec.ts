import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTransithistoryComponent } from './reserve-transithistory.component';

describe('ReserveTransithistoryComponent', () => {
  let component: ReserveTransithistoryComponent;
  let fixture: ComponentFixture<ReserveTransithistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveTransithistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveTransithistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
