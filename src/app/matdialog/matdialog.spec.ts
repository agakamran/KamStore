import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogComponent } from './matdialog';

describe('MatConfirmDialogComponent', () => {
  let component: MatDialogComponent;
  let fixture: ComponentFixture<MatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
