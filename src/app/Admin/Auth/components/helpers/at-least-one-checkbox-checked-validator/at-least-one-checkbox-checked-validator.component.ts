import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const atLeastOneCheckboxCheckedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dineIn = control.get('dineIn')?.value;
  const takeaway = control.get('takeaway')?.value;
  const delivery = control.get('delivery')?.value;
  const catering = control.get('catering')?.value;

  if (dineIn || takeaway || delivery || catering) {
    return null;
  }

  return { atLeastOneRequired: true }; 
};
