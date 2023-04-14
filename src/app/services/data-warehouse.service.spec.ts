import { TestBed } from '@angular/core/testing';

import { DataWarehouseService } from './data-warehouse.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('DataWarehouseService', () => {
  let service: DataWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
      ],
      providers: [
        AngularFireAuth
      ]
    });
    service = TestBed.inject(DataWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
