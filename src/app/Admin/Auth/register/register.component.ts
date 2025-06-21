import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StepBasicInfoComponent } from '../components/steps/step-basic-info/step-basic-info.component';
import { StepLocationComponent } from '../components/steps/step-location/step-location.component';
import { StepBusinessComponent } from '../components/steps/step-business/step-business.component';
import { StepOwnerComponent } from '../components/steps/step-owner/step-owner.component';
import { StepMediaComponent } from '../components/steps/step-media/step-media.component';
import { StepAdditionalFeaturesComponent } from '../components/steps/step-additional-features/step-additional-features.component';
import { atLeastOneCheckboxCheckedValidator } from '../components/helpers/at-least-one-checkbox-checked-validator/at-least-one-checkbox-checked-validator.component';
import { routes } from '../../../app.routes';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [RouterModule, CommonModule, ReactiveFormsModule,StepBasicInfoComponent,StepLocationComponent,StepBusinessComponent,StepOwnerComponent,StepMediaComponent,StepAdditionalFeaturesComponent],
  styleUrls: ['./register.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent {
  signupForm: FormGroup;
  selectedLogo: File | null = null;
  selectedPhotos: File[] = [];
  fileError = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  currentStep = 1;
  totalSteps = 6;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      // Step 1: Basic Info
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      facilityName: ['', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+9627[789]\d{7}$/)
      ]],
      facilityType: ['', Validators.required],
      facilityWebsite: [''],  // أضف هذا الحقل

      // Step 2: Location
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      latitude: ['', [
        Validators.required,
        Validators.pattern(/^(\+|-)?(?:90(?:\.0+)?|[1-8]?\d(?:\.\d+)?)$/)
      ]],
      longitude: ['', [
        Validators.required,
        Validators.pattern(/^(\+|-)?(?:180(?:\.0+)?|1[0-7]\d(?:\.\d+)?|[1-9]?\d(?:\.\d+)?)$/)
      ]],


      // Step 3: Business
      seatingCapacity: ['', Validators.required],
      cuisineType: ['', Validators.required],
      priceRange: ['', Validators.required],
      serviceOptions: this.fb.group({
          dineIn: [false],
          takeaway: [false],
          delivery: [false],
          catering: [false],
        }, { validators: atLeastOneCheckboxCheckedValidator }),

      // Step 4: Owner/Manager
      ownerName: ['', Validators.required],
      managerName: ['', Validators.required],
      emergencyContact: ['', [Validators.required, Validators.pattern(/^\+9627[789]\d{7}$/)]],


      // Step 5: Media (files handled separately)

      // Step 6: Features
      wifi: [false],
      parking: [false],
      outdoorSeating: [false],
      accessible: [false],
      halal: [false],
      vegetarianOptions: [false],
      veganOptions: [false],
      allergenInfo: [false],
    });
  }

onLogoSelected(file: File | null) {
  if (file && file.type.startsWith('image/')) {
    this.selectedLogo = file;
    this.fileError = '';
  } else {
    this.selectedLogo = null;
    this.fileError = 'Invalid logo format.';
  }
}

onPhotosSelected(files: File[]) {
  this.selectedPhotos = files.filter(file => file.type.startsWith('image/'));
}

nextStep() {
  const stepControls = this.getCurrentStepControls();

  let hasError = false;
  stepControls.forEach(control => {
    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
      if (control.invalid) {
        hasError = true;
      }
    }
  });

  if (hasError) return;

  if (this.currentStep < this.totalSteps) {
    this.currentStep++;
  }
}




  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

onSubmit() {
  if (this.signupForm.invalid || !this.selectedLogo) {
    this.signupForm.markAllAsTouched();
    if (!this.selectedLogo) this.fileError = 'Logo is required.';
    return;
  }

  this.isLoading = true;
  const formValue = this.signupForm.value;
  const formData = new FormData();

  // Append all scalar fields from formValue
  Object.keys(formValue).forEach(key => {
    const value = formValue[key];

    // Handle nested serviceOptions group separately
    if (key === 'serviceOptions' && typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(optKey => {
        formData.append(optKey, value[optKey].toString());
      });
    }
    else {
      formData.append(key, value);
    }
  });

  // Append logo file
  if (this.selectedLogo) {
    formData.append('Logo', this.selectedLogo, this.selectedLogo.name);
  }

  // Append multiple photos
  this.selectedPhotos.forEach((file, i) => {
    formData.append('Photos', file, file.name);
  });

  this.authService.register(formData).subscribe({
    next: () => {
      this.isLoading = false;
      this.successMessage = 'Registered successfully!';
      this.signupForm.reset();
      this.selectedLogo = null;
      this.selectedPhotos = [];
      this.router.navigate(['Auth/login']);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage =
        err?.error?.errors?.map((e: any) => e.Errors).flat().join(', ') ||
        err?.error?.error ||
        'Registration failed.';
    }
  });
}

onLogoUpdated(file: File | null) {
  this.selectedLogo = file;
}

onPhotosUpdated(files: File[]) {
  this.selectedPhotos = files;
}
private getCurrentStepControls(): any[] {
  switch (this.currentStep) {
    case 1:
      return [
        this.signupForm.get('facilityName'),
        this.signupForm.get('facilityType'),
        this.signupForm.get('mobileNumber'),
        this.signupForm.get('email'),
        this.signupForm.get('password'),
      ];
    case 2:
      return [
        this.signupForm.get('streetAddress'),
        this.signupForm.get('city'),
        this.signupForm.get('state'),
        this.signupForm.get('postalCode'),
        this.signupForm.get('country'),
        this.signupForm.get('latitude'),
        this.signupForm.get('longitude'),
      ];
    case 3:
      return [
        this.signupForm.get('seatingCapacity'),
        this.signupForm.get('cuisineType'),
        this.signupForm.get('priceRange'),
        this.signupForm.get('serviceOptions')
      ];
    case 4:
      return [
        this.signupForm.get('ownerName'),
        this.signupForm.get('managerName'),
        this.signupForm.get('emergencyContact'),
      ];
    default:
      return [];
  }
}


}
  