import { TestBed } from '@angular/core/testing';

import { HomeDetailService } from './home-detail.service';

describe('HomeDetailService', () => {
  let service: HomeDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
