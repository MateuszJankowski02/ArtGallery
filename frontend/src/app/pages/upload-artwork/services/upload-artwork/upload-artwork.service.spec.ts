import { TestBed } from '@angular/core/testing';

import { UploadArtworkService } from './upload-artwork.service';

describe('UploadArtworkService', () => {
  let service: UploadArtworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadArtworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
