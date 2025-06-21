import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-media',
  templateUrl: './step-media.component.html',
  styleUrls: ['./step-media.component.scss'],
  imports:[CommonModule  ,ReactiveFormsModule],
  standalone: true,
})
export class StepMediaComponent {
  @Input() form!: FormGroup;
 @Output() logoChange = new EventEmitter<File | null>();
 @Output() photosChange = new EventEmitter<File[]>();
  logoFile: File | null = null;
  photosFiles: File[] = [];
  logoError: string = '';
  photosError: string = '';
logoTouched: boolean = false;
  onLogoSelected(event: Event) {
    this.logoTouched = true;
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.logoFile = null;
      this.logoChange.emit(null); 
      this.logoError = 'Please select a logo image.';
      return;
    }
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.logoError = 'Invalid file type. Please select an image file.';
      this.logoFile = null;
      return;
    }
    this.logoError = '';
    this.logoFile = file;
    this.logoChange.emit(file);
  }

onPhotosSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) {
    this.photosError = 'Please select restaurant photos.';
    return;
  }

  const newFiles = Array.from(input.files).filter(file => file.type.startsWith('image/'));

  if (newFiles.length === 0) {
    this.photosError = 'Invalid file types detected. Please select image files only.';
    return;
  }

  // دمج الملفات الجديدة مع القديمة
  this.photosFiles = [...this.photosFiles, ...newFiles];

  this.photosError = '';
  this.photosChange.emit(this.photosFiles);
}
 removePhoto(index: number) {
    this.photosFiles.splice(index, 1);
  }
  
}
