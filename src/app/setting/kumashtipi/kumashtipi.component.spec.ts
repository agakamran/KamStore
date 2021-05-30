import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KumashtipiComponent } from './kumashtipi.component';

describe('KumashtipiComponent', () => {
  let component: KumashtipiComponent;
  let fixture: ComponentFixture<KumashtipiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KumashtipiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KumashtipiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
