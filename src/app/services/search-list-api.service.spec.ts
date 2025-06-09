import { TestBed } from '@angular/core/testing';

import { SearchListApiService } from './search-list-api.service';

describe('SearchListApiService', () => {
  let service: SearchListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
