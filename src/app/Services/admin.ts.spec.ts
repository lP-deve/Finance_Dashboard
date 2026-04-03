import { TestBed } from '@angular/core/testing';

import { AdminTs } from './admin.ts';

describe('AdminTs', () => {
  let service: AdminTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
