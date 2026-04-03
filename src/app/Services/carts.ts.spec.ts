import { TestBed } from '@angular/core/testing';

import { CartsTs } from './carts.ts';

describe('CartsTs', () => {
  let service: CartsTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartsTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
