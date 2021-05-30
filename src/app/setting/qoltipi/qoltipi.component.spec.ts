import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoltipiComponent } from './qoltipi.component';

describe('QoltipiComponent', () => {
  let component: QoltipiComponent;
  let fixture: ComponentFixture<QoltipiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoltipiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoltipiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
