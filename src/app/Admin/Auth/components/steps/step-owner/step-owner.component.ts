import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-owner',
  templateUrl: './step-owner.component.html',
  styleUrls: ['./step-owner.component.scss'],
    imports:[ReactiveFormsModule,CommonModule],
    standalone: true,
})
export class StepOwnerComponent {
  @Input() form!: FormGroup;
}
