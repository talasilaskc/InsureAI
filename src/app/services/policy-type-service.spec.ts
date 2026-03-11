import { TestBed } from '@angular/core/testing';

import { PolicyTypeService } from './policy-type-service';

describe('PolicyTypeService', () => {
  let service: PolicyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
