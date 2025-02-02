import { TestBed } from '@angular/core/testing';

import { SgeiPagosContextService } from './sgei-pagos-context.service';

describe('SgeiPagosContextService', () => {
  let service: SgeiPagosContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgeiPagosContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
