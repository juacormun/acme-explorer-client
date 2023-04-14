import { TestBed } from '@angular/core/testing';

import { DataWarehouseService } from './data-warehouse.service';

describe('DataWarehouseService', () => {
  let service: DataWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
