import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorerApplicationsComponent } from './explorer-applications.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('ExplorerApplicationsComponent', () => {
  let component: ExplorerApplicationsComponent;
  let fixture: ComponentFixture<ExplorerApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerApplicationsComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), HttpClientModule],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
