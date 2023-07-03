import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function authPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstName = control.value.firstName.toLowerCase();
    const lastName = control.value.lastName.toLowerCase();
    const password = control.value.password.toLowerCase();

    if (!password) {
      return null;
    }

    if (!firstName && !lastName) {
      return null;
    }

    return (firstName && password.includes(firstName)) ||
      (lastName && password.includes(lastName))
      ? { password: true }
      : null;
  };
}
