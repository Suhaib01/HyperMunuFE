import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpEventType } from '@angular/common/http';
import { FilesService } from '../../../../../services/file-service/files.service';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  providers: [],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})

export class UploadFileComponent {
  fileName: string = '';
  fileURL: string = ''; // URL of the uploaded file for download
  fileType: string = ''; 
  uploading: boolean = false;
  uploadProgress: number = 0;
  fileUploaded: boolean = false;
  isDragOver: boolean = false;
  fileToUpload: File | null = null;

  branchId: string | null = null;

  constructor(private fileService: FilesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.branchId = this.activatedRoute.snapshot.paramMap.get('branchId');
  }

  // Handle file selection (either through input or drag-drop)
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.previewFile(file);
    }
  }

  // Handle file drag-and-drop
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.previewFile(file);
    }
  }

  // Preview the selected file (only PDF for now)
  previewFile(file: File): void {
    if (file.type === 'application/pdf') {
      this.fileName = file.name;
      this.fileType = 'pdf'; // Set file type as PDF
      this.createFileURL(file); // Create a URL to preview the PDF
      this.fileToUpload = file; // Store the file for uploading
      this.startUpload(); // Start the upload automatically
    } else {
      alert('Only PDF files are allowed.');
    }
  }

  // Create a URL for the selected PDF file to preview
  createFileURL(file: File): void {
    this.fileURL = URL.createObjectURL(file);
  }

  // Start the upload and simulate progress
  startUpload(): void {
    this.uploading = true;
    this.uploadProgress = 0;

    const uploadInterval = setInterval(() => {
      if (this.uploadProgress >= 100) {
        clearInterval(uploadInterval);
        this.uploading = false;
        this.fileUploaded = true;
        this.submitForm(); 
      } else {
        this.uploadProgress += 10;
      }
    }, 300);
  }

  submitForm(): void {
    if (this.fileToUpload) {
      this.fileService.uploadFile(this.branchId, this.fileToUpload).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            }
          } else if (event.type === HttpEventType.Response) {
            // Assuming the response contains the file download URL
            this.fileURL = event.body?.fileURL; // Get the file URL after successful upload
            alert('File uploaded successfully! You can download it now.');
          }
        },
        (error) => {
          alert('File upload failed. Please try again.');
        }
      );
    } else {
      alert('Please select a file first!');
    }
  }

  // Provide a method to allow downloading the file
  downloadFile(): void {
    if (this.fileURL) {
      window.open(this.fileURL, '_blank'); // Open the file in a new tab for download
    } else {
      alert('No file available for download.');
    }
  }

  // Frontend-only file deletion (clear the uploaded file state)
  deleteFile(): void {
    // Reset the file upload state without deleting the actual file on the server
    this.fileName = '';
    this.fileUploaded = false;
    this.uploading = false;
    this.uploadProgress = 0;
    this.fileURL = ''; 
    this.fileType = '';
    this.fileToUpload = null;
    this.router.navigate(['/Home/dashboard']);
  }
}
