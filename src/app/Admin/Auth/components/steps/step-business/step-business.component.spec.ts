import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBusinessComponent } from './step-business.component';

describe('StepBusinessComponent', () => {
  let component: StepBusinessComponent;
  let fixture: ComponentFixture<StepBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
