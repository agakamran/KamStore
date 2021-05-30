import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazirlaComponent } from './hazirla.component';

describe('HazirlaComponent', () => {
  let component: HazirlaComponent;
  let fixture: ComponentFixture<HazirlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazirlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazirlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
