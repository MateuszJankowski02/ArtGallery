import { TestBed } from '@angular/core/testing';

import { FetchRandomImageService } from './fetch-random-image.service';

describe('FetchRandomImageService', () => {
  let service: FetchRandomImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchRandomImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
