import { TestBed } from '@angular/core/testing';

import { FetchUserDetailsService } from './fetch-user-details.service';

describe('FetchUserDetailsService', () => {
  let service: FetchUserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
