import { TestBed } from '@angular/core/testing';

import { MenujsonService } from './menujson.service';

describe('MenujsonService', () => {
  let service: MenujsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenujsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
