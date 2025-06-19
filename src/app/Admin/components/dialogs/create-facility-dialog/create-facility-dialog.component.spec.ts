import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacilityDialogComponent } from './create-facility-dialog.component';

describe('CreateFacilityDialogComponent', () => {
  let component: CreateFacilityDialogComponent;
  let fixture: ComponentFixture<CreateFacilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFacilityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFacilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
