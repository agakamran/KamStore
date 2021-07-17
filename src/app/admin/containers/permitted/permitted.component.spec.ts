import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermittedComponent } from './permitted.component';

describe('PermittedComponent', () => {
  let component: PermittedComponent;
  let fixture: ComponentFixture<PermittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermittedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
