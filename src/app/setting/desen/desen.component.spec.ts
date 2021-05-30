import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesenComponent } from './desen.component';

describe('DesenComponent', () => {
  let component: DesenComponent;
  let fixture: ComponentFixture<DesenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
