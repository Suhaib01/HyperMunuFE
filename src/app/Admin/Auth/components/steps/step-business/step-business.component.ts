import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-business',
  templateUrl: './step-business.component.html',
  styleUrls: ['./step-business.component.scss'],
  imports:[ReactiveFormsModule,CommonModule],
  standalone: true,
})
export class StepBusinessComponent {
  @Input() form!: FormGroup;

get serviceOptionsGroup(): FormGroup | null {
    const group = this.form.get('serviceOptions');
    return group instanceof FormGroup ? group : null;
  }
   isServiceOptionsTouched(): boolean {
    const group = this.form.get('serviceOptions') as FormGroup | null;
    if (!group) return false;
    return group.touched || Object.values(group.controls).some(ctrl => ctrl.touched);
  }
}
