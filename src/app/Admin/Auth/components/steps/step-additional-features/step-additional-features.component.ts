import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-additional-features',
  templateUrl: './step-additional-features.component.html',
  styleUrls: ['./step-additional-features.component.scss'],
  imports:[ReactiveFormsModule],
  standalone: true, 
})
export class StepAdditionalFeaturesComponent {
  @Input() form!: FormGroup;
}
