// step-location.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-location',
  templateUrl: './step-location.component.html',
  styleUrls: ['./step-location.component.scss'],
    imports:[CommonModule,ReactiveFormsModule],
    standalone: true,
})
export class StepLocationComponent {
  @Input() form!: FormGroup;
}
