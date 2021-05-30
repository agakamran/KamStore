import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MykabComponent } from './mykab.component';

describe('MykabComponent', () => {
  let component: MykabComponent;
  let fixture: ComponentFixture<MykabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MykabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MykabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
