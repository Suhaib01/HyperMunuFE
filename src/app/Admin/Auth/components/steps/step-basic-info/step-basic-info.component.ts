// step-basic-info.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-step-basic-info',
  templateUrl: './step-basic-info.component.html',
  styleUrls: ['./step-basic-info.component.scss'],
  imports:[CommonModule,ReactiveFormsModule],
   standalone: true, 
})
export class StepBasicInfoComponent {
  @Input() form!: FormGroup;
}
