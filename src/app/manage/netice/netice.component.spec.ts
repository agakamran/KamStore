import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeticeComponent } from './netice.component';

describe('NeticeComponent', () => {
  let component: NeticeComponent;
  let fixture: ComponentFixture<NeticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
