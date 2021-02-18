import { TestBed } from '@angular/core/testing';

import { HomeCreateService } from './home-create.service';

describe('HomeDetailService', () => {
  let service: HomeCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
