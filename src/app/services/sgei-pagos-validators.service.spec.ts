import { TestBed } from '@angular/core/testing';

import { SgeiPagosValidatorsService } from './sgei-pagos-validators.service';

describe('SgeiPagosValidatorsService', () => {
  let service: SgeiPagosValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgeiPagosValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
