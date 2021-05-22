import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopCapturerComponent } from './desktop-capturer.component';

describe('DesktopCapturerComponent', () => {
  let component: DesktopCapturerComponent;
  let fixture: ComponentFixture<DesktopCapturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopCapturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopCapturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
