import { TestBed } from '@angular/core/testing';

import { ClientListApi } from './client-list-api.service';

describe('ClientListApiService', () => {
  let service: ClientListApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientListApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
