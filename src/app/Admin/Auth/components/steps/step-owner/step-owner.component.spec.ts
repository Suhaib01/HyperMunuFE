import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOwnerComponent } from './step-owner.component';

describe('StepOwnerComponent', () => {
  let component: StepOwnerComponent;
  let fixture: ComponentFixture<StepOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
