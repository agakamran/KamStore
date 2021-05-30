import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriyaComponent } from './categoriya.component';

describe('CategoriyaComponent', () => {
  let component: CategoriyaComponent;
  let fixture: ComponentFixture<CategoriyaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
