import { TestBed } from '@angular/core/testing';

import { AiSystemService } from './ai-system-service';

describe('AiSystemService', () => {
  let service: AiSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
