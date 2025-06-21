import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBasicInfoComponent } from './step-basic-info.component';

describe('StepBasicInfoComponent', () => {
  let component: StepBasicInfoComponent;
  let fixture: ComponentFixture<StepBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepBasicInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
