import { TestBed } from '@angular/core/testing';

import { UserListApiService } from './user-list-api.service';

describe('UserListApiService', () => {
  let service: UserListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
