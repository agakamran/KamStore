import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullanimalaniComponent } from './kullanimalani.component';

describe('KullanimalaniComponent', () => {
  let component: KullanimalaniComponent;
  let fixture: ComponentFixture<KullanimalaniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullanimalaniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullanimalaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
