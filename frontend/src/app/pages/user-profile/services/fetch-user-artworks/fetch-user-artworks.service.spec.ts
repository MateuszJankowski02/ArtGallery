import { TestBed } from '@angular/core/testing';

import { FetchUserArtworksService } from './fetch-user-artworks.service';

describe('FetchUserArtworksService', () => {
  let service: FetchUserArtworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchUserArtworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
