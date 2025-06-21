import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAdditionalFeaturesComponent } from './step-additional-features.component';

describe('StepAdditionalFeaturesComponent', () => {
  let component: StepAdditionalFeaturesComponent;
  let fixture: ComponentFixture<StepAdditionalFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepAdditionalFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepAdditionalFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
