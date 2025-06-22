import { TestBed } from '@angular/core/testing';

import { ClientDetailsApiService } from './client-details-api.service';

describe('ClientDetailsApiService', () => {
  let service: ClientDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
