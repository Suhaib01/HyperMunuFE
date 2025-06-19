import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchesService } from '../../../../../services/branch-service/branches.service';
import { IdService } from '../../../../../services/idNumbers-service/id.service';



@Component({
  selector: 'app-create-branch-dialog',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-branch-dialog.component.html',
  styleUrl: './create-branch-dialog.component.scss'
})
export class CreateBranchDialogComponent {
  branchForm: FormGroup;
  facilityId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private branchService: BranchesService,
    private activatedRouter : ActivatedRoute,
    public dialogRef: MatDialogRef<CreateBranchDialogComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { message: string },
       private idService: IdService
  ) {this.branchForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ]
 });
this.facilityId = this.idService.getFacilityId();
}


  onSubmit(): void {
    if (this.branchForm.valid) {
      // Call the service method to add the facility
      this.branchService.createBranch(this.facilityId,this.branchForm.value).subscribe({
        next: (response) => {

          this.dialogRef.close(this.branchForm.value);
        },
        error: (error) => {

          alert('Error creating facility');
        }
      });
  }
  }
  // Method to close the form or dialog (if applicable)
  onClose(): void {
    this.dialogRef.close();
  }
}
