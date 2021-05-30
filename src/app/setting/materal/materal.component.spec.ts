import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateralComponent } from './materal.component';

describe('MateralComponent', () => {
  let component: MateralComponent;
  let fixture: ComponentFixture<MateralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
