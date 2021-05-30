import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YakaComponent } from './yaka.component';

describe('YakaComponent', () => {
  let component: YakaComponent;
  let fixture: ComponentFixture<YakaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YakaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
