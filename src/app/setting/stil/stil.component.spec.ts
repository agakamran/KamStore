import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StilComponent } from './stil.component';

describe('StilComponent', () => {
  let component: StilComponent;
  let fixture: ComponentFixture<StilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
