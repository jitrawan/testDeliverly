import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FshowzoneComponent } from './fshowzone.component';

describe('FshowzoneComponent', () => {
  let component: FshowzoneComponent;
  let fixture: ComponentFixture<FshowzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FshowzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FshowzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
