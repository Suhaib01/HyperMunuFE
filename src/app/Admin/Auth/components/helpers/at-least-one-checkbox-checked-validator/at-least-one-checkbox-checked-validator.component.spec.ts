import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtLeastOneCheckboxCheckedValidatorComponent } from './at-least-one-checkbox-checked-validator.component';

describe('AtLeastOneCheckboxCheckedValidatorComponent', () => {
  let component: AtLeastOneCheckboxCheckedValidatorComponent;
  let fixture: ComponentFixture<AtLeastOneCheckboxCheckedValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtLeastOneCheckboxCheckedValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtLeastOneCheckboxCheckedValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
