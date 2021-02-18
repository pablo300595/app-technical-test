import { TestBed } from '@angular/core/testing';

import { FriendsSidebarService } from './friends-sidebar.service';

describe('FriendsSidebarService', () => {
  let service: FriendsSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
