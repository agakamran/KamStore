import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedenComponent } from './beden.component';

describe('BedenComponent', () => {
  let component: BedenComponent;
  let fixture: ComponentFixture<BedenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
