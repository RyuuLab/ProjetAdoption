import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidator {

  static confirmPasswordValidator(firstPassword: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value) && control.value !== firstPassword.value) {
        return {confirmPasswordValidator: true};
      }
      return null;
    };
  }
}
