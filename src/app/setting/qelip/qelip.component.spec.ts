import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QelipComponent } from './qelip.component';

describe('QelipComponent', () => {
  let component: QelipComponent;
  let fixture: ComponentFixture<QelipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QelipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QelipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
