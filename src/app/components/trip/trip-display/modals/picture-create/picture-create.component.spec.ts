import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCreateComponent } from './picture-create.component';

describe('PictureCreateComponent', () => {
  let component: PictureCreateComponent;
  let fixture: ComponentFixture<PictureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
