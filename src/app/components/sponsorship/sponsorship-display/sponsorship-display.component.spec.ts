// import { ActivatedRoute } from '@angular/router';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SponsorshipDisplayComponent } from './sponsorship-display.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from 'src/environments/environment';
// import { HttpClientModule } from '@angular/common/http';
// import { ActivatedRouteStub } from '../../shared/activatedroute-stub';
// import { Actor } from 'src/app/models/actor';
// import { Role } from 'src/app/enums/RoleEnum';
// import { AuthService } from 'src/app/services/auth.service';

// describe('SponsorshipDisplayComponent', () => {
//   let component: SponsorshipDisplayComponent;
//   let fixture: ComponentFixture<SponsorshipDisplayComponent>;

//   let mockactivatedRoute: ActivatedRouteStub;
//   let testActor: Actor;
//   let getActorSpy: any;

//   beforeEach(async () => {
//     mockactivatedRoute = new ActivatedRouteStub();
//     mockactivatedRoute.testParams = { id: "63e144632ba413df4fa0d9b2" };

//     // Create mock Actor
//     testActor = new Actor();
//     testActor.role = Role.MANAGER;
//     testActor.id = "63fbaa3db0300ae7e5d9b3d8";

//     // Create spy for getActor
//     let actorSpy = jasmine.createSpyObj('AuthService', ['getCurrentActor']);
//     getActorSpy = actorSpy.getCurrentActor.and.returnValue((testActor));

//     await TestBed.configureTestingModule({
//       declarations: [ SponsorshipDisplayComponent ],
//       imports: [AngularFireModule.initializeApp(environment.firebaseConfig), HttpClientModule],
//       providers: [
//         { provide: ActivatedRoute, useValue: mockactivatedRoute },
//         { provide: AuthService, useValue: actorSpy },
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SponsorshipDisplayComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
