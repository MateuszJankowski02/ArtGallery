import { TestBed } from '@angular/core/testing';

import { FetchArtworksService } from './fetch-artworks.service';

describe('FetchArtworksService', () => {
  let service: FetchArtworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchArtworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
