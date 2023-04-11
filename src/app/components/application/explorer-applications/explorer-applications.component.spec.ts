import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerApplicationsComponent } from './explorer-applications.component';

describe('ExplorerApplicationsComponent', () => {
  let component: ExplorerApplicationsComponent;
  let fixture: ComponentFixture<ExplorerApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerApplicationsComponent ]
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
