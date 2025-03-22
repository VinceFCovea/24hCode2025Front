import { TestBed } from '@angular/core/testing';

import { MondeService } from './monde.service';

describe('MondeService', () => {
  let service: MondeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MondeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
