import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnitemComponent } from './onitem.component';

describe('OnitemComponent', () => {
  let component: OnitemComponent;
  let fixture: ComponentFixture<OnitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
