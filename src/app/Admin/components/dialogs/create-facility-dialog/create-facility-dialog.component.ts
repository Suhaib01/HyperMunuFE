import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacilitiesService } from '../../../../../services/facility-service/facilities.service';




@Component({
  selector: 'app-create-facility-dialog',
  imports: [MatDialogModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-facility-dialog.component.html',
  styleUrls: ['./create-facility-dialog.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateFacilityDialogComponent {

  facilityForm: FormGroup;

  facilityTypes = ['Gym', 'Library', 'Swimming Pool', 'Auditorium']; // Example facility types

  constructor(
    public dialogRef: MatDialogRef<CreateFacilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private fb: FormBuilder,
    private facilityService: FacilitiesService
  ) {
    this.facilityForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.facilityForm.valid) {

      this.facilityService.createFacility(this.facilityForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close(this.facilityForm.value);
        },
        error: (error) => {

          alert('Error creating facility');
        }
      });
    }
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}
