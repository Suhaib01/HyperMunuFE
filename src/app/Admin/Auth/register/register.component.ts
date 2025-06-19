import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:[CommonModule, ReactiveFormsModule],
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signupForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      facilityName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      facilityType: ['', Validators.required],
      facilityInfo: ['', Validators.required],
      facilityFacebook: [''],
      facilityInstagram: [''],
      facilityX: [''],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.selectedFile = null;
      this.fileError = 'Please select an image file.';
      return;
    }

    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.fileError = 'Please select a valid image file.';
      this.selectedFile = null;
      return;
    }

    this.fileError = '';
    this.selectedFile = file;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.fileError = 'Facility image is required.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    const formValue = this.signupForm.value;

    formData.append('Email', formValue.email);
    formData.append('Password', formValue.password);
    formData.append('FacilityName', formValue.facilityName);
    formData.append('MobileNumber', formValue.mobileNumber);
    formData.append('FacilityType', formValue.facilityType);
    formData.append('FacilityInfo', formValue.facilityInfo);
    formData.append('FacilityFacebook', formValue.facilityFacebook || '');
    formData.append('FacilityInstagram', formValue.facilityInstagram || '');
    formData.append('FacilityImage', this.selectedFile);

    this.authService.register(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Registered successfully!';
        this.signupForm.reset();
        this.selectedFile = null;
        this.router.navigate(['Auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.errors?.map((e: any) => e.Errors).flat().join(', ') ||
          err?.error?.error ||
          'Registration failed.';
      },
    });
  }
}
