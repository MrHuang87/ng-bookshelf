import { TestBed, inject } from '@angular/core/testing';

import { BookCollectionService } from './book-collection.service';

describe('BookCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCollectionService]
    });
  });

  it('should be created', inject([BookCollectionService], (service: BookCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
